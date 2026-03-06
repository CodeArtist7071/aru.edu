import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import { PdfService } from "../pdf/pdf.service";
import { OcrService } from "../ocr/ocr.service";
import { QuestionService } from "../question/question.service";

@Injectable()
export class DriveService {
  private drive: any;

  constructor(
    private pdfService: PdfService,
    private ocrService: OcrService,
    private questionService: QuestionService,
  ) {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "src/config/credentials.json"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    this.drive = google.drive({
      version: "v3",
      auth,
    });
  }

  async listPDFs() {
    const response = await this.drive.files.list({
      q: "mimeType='application/pdf'",
      fields: "files(id,name)",
    });

    return response.data.files;
  }

  async downloadPDF(fileId: string, fileName: string) {
    const filePath = path.join(process.cwd(), "src/uploads", fileName); // <-- pdfPath will be this
    const dest = fs.createWriteStream(filePath);

    const response = await this.drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" },
    );

    return new Promise<string>((resolve, reject) => {
      response.data
        .pipe(dest)
        .on("finish", () => resolve(filePath)) // <-- this resolves pdfPath
        .on("error", reject);
    });
  }
  // async processPDF(fileId: string, fileName: string) {
  //   const pdfPath = await this.downloadPDF(fileId, fileName);
  //   const pdfName = path.basename(pdfPath, ".pdf");

  //   // Convert PDF → Images
  //   await this.pdfService.convertPDFToImages(pdfPath);

  //   // Run OCR
  //   const extractedText = await this.ocrService.extractTextFromImages(pdfName);

  //   // Extract structured questions
  //   const questions = this.questionService.parseTextToQuestions(extractedText);

  //   return { extractedText, questions };
  // }

  // async processPDF(pdfPath: string) {
  //   const folderName = path.basename(pdfPath, ".pdf");

  //   // 1️⃣ Convert PDF to images
  //   await this.pdfService.convertPDFToImages(pdfPath);

  //   // 2️⃣ Extract OCR text
  //   const extractedText =
  //     await this.ocrService.extractTextFromImages(folderName);

  //   // 3️⃣ Parse structured questions
  //   const questions = this.questionService.parseTextToQuestions(extractedText);

  //   console.log(`OCR + Parsing complete for PDF: ${folderName}`);
  //   return { pdf: folderName, questions, extractedText: extractedText };
  // }

  async processPDF(fileId: string, fileName: string) {
    try {
      // Step 1: Download PDF locally
      const filePath: string = await this.downloadPDF(
        fileId,
        fileName,
      );
      // filePath example: 'src/uploads/OSSCCGLPrelimsOfficial.pdf'

      // Step 2: Convert PDF → Images
      const folderName = path.basename(filePath, ".pdf"); // OSSCCGLPrelimsOfficial
      await this.pdfService.convertPDFToImages(filePath);

      // Step 3: OCR images → text
      const extractedText: string =
        await this.ocrService.extractTextFromImages(folderName);

      // Step 4: Parse questions
      const questions =
        this.questionService.parseTextToQuestions(extractedText);

      return { pdf: folderName, extractedText, questions };
    } catch (err) {
      console.error("Error processing PDF:", err);
      throw err;
    }
  }
}
