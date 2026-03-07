// src/ocr/ocr.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InferenceClient } from '@huggingface/inference';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';

@Injectable()
export class OcrService {
  private hf: InferenceClient;

  constructor(private configService: ConfigService) {
    const token = "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";

    if (!token) {
      throw new Error('HF_API_TOKEN is not set in environment variables');
    }

    this.hf = new InferenceClient(token);
  }

  /**
   * Convert Node.js Buffer → ArrayBuffer
   * Required for imageToText API
   */
  private toArrayBuffer(buffer: Buffer): ArrayBuffer {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
  }

  /**
   * Convert Buffer → Blob
   * Required for documentQuestionAnswering API
   */
  private toBlob(buffer: any): Blob {
    return new Blob([buffer]);
  }

  /**
   * Basic OCR (best for printed text)
   */
  async extractText(
    imageBuffer: Buffer,
    model = 'microsoft/trocr-large-printed',
  ): Promise<string> {
    try {
      const result = await this.hf.imageToText({
        model,
        data: this.toArrayBuffer(imageBuffer),
      });

      return result?.generated_text?.trim() ?? '';
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown OCR error';

      throw new BadRequestException(`OCR failed: ${message}`);
    }
  }

  /**
   * Structured question extraction
   * Uses VLM to extract questions from exam papers
   */
  async extractQuestionsStructured(
    imageBuffer: Buffer,
    model = 'Qwen/Qwen2.5-VL-7B-Instruct',
  ): Promise<string> {
    try {
      // Optimize image before sending to inference API
      const optimized = await sharp(imageBuffer)
        .resize({ width: 1024, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

      const result = await this.hf.documentQuestionAnswering({
        model,
        inputs: {
          image: this.toBlob(optimized),
          question:
            'Extract all exam questions. Ignore headers, instructions, and page numbers. Return a clean numbered list.',
        },
      });

      return result?.answer?.trim() ?? 'No questions detected';
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unknown structured OCR error';

      throw new BadRequestException(`Structured extraction failed: ${message}`);
    }
  }
}