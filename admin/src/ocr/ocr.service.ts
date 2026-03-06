import { Injectable, Options } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as path from "path";
import * as fs from "fs";
import Tesseract from "tesseract.js";
// import cvPromise from "@techstark/opencv-js";
import { Jimp } from "jimp";

@Injectable()
export class OcrService {
  private imagesDir: string;
  private tessPath: string;
  constructor(private configService: ConfigService) {
    const envDir = this.configService.get<string>("IMAGES_DIR");
    this.imagesDir = path.join(process.cwd(), envDir || "src/uploads/images");

    const tessPath =
      this.configService.get<string>("TESSERACT_PATH") ||
      "C:/Program Files/Tesseract-OCR/tessdata";
    if (!tessPath) {
      throw new Error("TESSERACT_PATH environment variable is required");
    }
    this.tessPath = tessPath;
    if (!fs.existsSync(this.imagesDir))
      fs.mkdirSync(this.imagesDir, { recursive: true });
  }
//   private async initCv() {
//     if (!this.cv) this.cv = cvPromise;
//     return this.cv;
//   }

//   /** Preprocess image: grayscale, threshold, resize using Jimp + OpenCV */
//   private async preprocessImage(filePath: string): Promise<Buffer> {
//   // Load image with Jimp
//   const image = await Jimp.read(filePath);

//   // Resize for better OCR (width ~1500px)
//   image.resize({w:1500});

//   // Convert to grayscale
//   image.greyscale();

//   // Get raw RGBA buffer
//   const { data, width, height } = image.bitmap;

//   // Create OpenCV Mat from raw buffer
//   const mat = cv.matFromArray(height, width, cv.CV_8UC4, data);

//   // Convert RGBA → Grayscale
//   cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);

//   // Threshold (binarization)
//   cv.threshold(mat, mat, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);

//   // Optional: Resize again
//   cv.resize(mat, mat, new cv.Size(1500, 0), 0, 0, cv.INTER_LINEAR);

//   // Convert Mat back to buffer for Tesseract
//   const processedBuffer = Buffer.from(mat.data);

//   mat.delete();
//   return processedBuffer;
// }

    private async preprocessImage(filePath: string) {
      const image = await Jimp.read(filePath);
      console.log("filePath....", filePath);
      image.greyscale().contrast(0.5); // Overwrite
    }
  async extractTextFromImages(pdfFolderName: string): Promise<string> {
    const imagesDir = path.join(this.imagesDir, pdfFolderName);
    const files = fs
      .readdirSync(imagesDir)
      .filter((f) => f.endsWith(".png"))
      .sort();

    let fullText = "";

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      console.log("OCR processing:", filePath);

      try {
        await this.preprocessImage(filePath); // Preprocess before OCR
        const { data } = await Tesseract.recognize(filePath, "eng", {
          logger: (m) => console.log(m),
          langPath: this.tessPath,
        });

        // Remove garbage symbols
        const cleanedText = data.text.replace(/[©§\[\]\*]/g, "").trim();
        fullText += cleanedText + "\n";
      } catch (err: any) {
        console.warn(
          `⚠️ Skipping image ${file} due to OCR error:`,
          err.message,
        );
        continue; // skip this image and proceed
      }
    }

    return fullText;
  }
}
