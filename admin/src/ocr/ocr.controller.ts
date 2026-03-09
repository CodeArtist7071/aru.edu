// src/ocr/ocr.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs/promises';
import { Express } from 'express';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract-text')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  async extractText(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(image\/jpeg|image\/png|application\/pdf)/,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: (error) =>
            new UnprocessableEntityException(error),
        }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const buffer = await fs.readFile(file.path);

      // Extract structured questions from OCR
      const questions =
        await this.ocrService.extractQuestionsStructured(buffer);

      // Clean up uploaded file
      await fs.unlink(file.path).catch(() => undefined);

      return {
        status: 'success',
        extracted: questions,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error';

      return {
        status: 'error',
        message,
      };
    }
  }
}