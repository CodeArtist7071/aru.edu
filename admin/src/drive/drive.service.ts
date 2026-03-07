import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as fsPromises from "fs/promises";
import * as fs from "fs";
import * as path from "path";
import { PdfService } from "../pdf/pdf.service";
import { OcrService } from "../ocr/ocr.service";
import { QuestionService } from "../question/question.service";
import { ColumnService } from "../question/column.service";
import { execSync } from "child_process";

@Injectable()
export class DriveService {
  private drive: any;

  constructor(
    private pdfService: PdfService,
    private ocrService: OcrService,
    private questionService: QuestionService,
    private columnService: ColumnService,
  ) {
    // DEBUG: Verify credentials file exists
    const credentialsPath = path.join(
      process.cwd(),
      "src/config/credentials.json",
    );
    console.log("✅ CWD:", process.cwd());
    console.log("✅ Credentials path:", credentialsPath);
    console.log("✅ File exists:", fs.existsSync(credentialsPath));

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`❌ Missing credentials.json at ${credentialsPath}`);
    }

    const stats = fs.statSync(credentialsPath);
    console.log("✅ File size:", stats.size, "bytes");

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
 
  /** 🔥 NEW: Cleanup temp images after processing */
  async cleanupImages(imageDir: string): Promise<void> {
    try {
      // ✅ Node.js 18+ CORRECT syntax
      await fsPromises.rm(imageDir, {
        recursive: true, // ✅ Valid in fs.rm
        maxRetries: 3, // ✅ Retry on failure
        force: true, // ✅ Ignore missing dirs
      });
      console.log(`🗑️ Cleaned up: ${imageDir}`);
    } catch (error) {
      console.warn(`⚠️ Cleanup failed for ${imageDir}:`, error);
    }
  }


  async processPDF(fileId: string, fileName: string) {
    const heartbeat = setInterval(() => {
      console.log("💓 HEARTBEAT - Still processing...");
    }, 30000);

    const timeout = setTimeout(() => {
      console.error("⏰ TIMEOUT - Killing hanging processes");
      try {
        execSync("taskkill /f /im pdftoppm.exe /t", { stdio: "ignore" });
      } catch {}
    }, 600000); // 10 minutes (30 pages safe)

    try {
      console.log("📥 Step 1: Google Drive download...");
      const filePath: string = await this.downloadPDF(fileId, fileName);

      console.log("📄 Step 2: PDF → Images...");
      const folderName = path.basename(filePath, ".pdf");
      const imageDir = await this.pdfService.convertPDFToImages(filePath);

      console.log("🔍 Step 3: Column detection...");
      const columns = await this.columnService.detectAllColumns(imageDir);

      console.log("🔎 Step 4: OCR columns...");
      const pageTexts: string[] = [];



      let extractedText = pageTexts.join("\n\n");

  

      console.log("❓ Step 6: Question parsing...");
      const questions = this.questionService.parseTextToQuestions(
        extractedText,
        columns,
      );

      console.log("🗑️ Step 7: Cleanup...");
      await this.cleanupImages(imageDir);

      console.log("🎉 Step 8: SUCCESS!");

      return {
        pdf: folderName,
        extractedText,
        questions,
        columns: columns.map((c) => ({
          page: c.pageNum,
          confidence: c.confidence,
        })),
      };
    } catch (err) {
      console.error("❌ Error processing PDF:", err);
      throw err;
    } finally {
      // 🔥 CRITICAL FIX
      clearInterval(heartbeat);
      clearTimeout(timeout);

      console.log("🧹 Timers cleared");
    }
  }
}
