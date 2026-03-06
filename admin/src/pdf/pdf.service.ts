import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as poppler from "pdf-poppler";

@Injectable()
export class PdfService {
  async convertPDFToImages(pdfPath: string) {
    const pdfName = path.basename(pdfPath, ".pdf");
    const outputDir = path.join(process.cwd(), "src/uploads/images", pdfName);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // Get total pages
    const totalPages = await this.getPdfPageCount(pdfPath);

    console.log(`Converting PDF "${pdfName}" with ${totalPages} pages...`);

    for (let i = 1; i <= totalPages; i++) {
      const options = {
        format: "png",
        out_dir: outputDir,
        out_prefix: pdfName,
        scale: 1024,
        dpi: 150,
        page: i, // process one page at a time
      };

      try {
        await poppler.convert(pdfPath, options);
        console.log(`✅ Page ${i} converted to high Resolution successfully`);
        //  return outputDir;
      } catch (err:any) {
        console.warn(
          `⚠️ Skipping page ${i} due to Poppler error:`,
          err.message,
        );
      }
    }

    console.log("PDF conversion complete");

    return outputDir;
  }

  // Utility to count PDF pages
  private async getPdfPageCount(pdfPath: string): Promise<number> {
    // Use pdf-poppler's info command
    const info = await poppler.info(pdfPath);
    return info.pages || 0;
  }
}
