// import { Injectable } from "@nestjs/common";
// import * as path from "path";
// import * as fs from "fs";
// import * as poppler from "pdf-poppler";
// import sharp from "sharp"

// @Injectable()
// export class PdfService {
//   async convertPDFToImages(pdfPath: string) {
//     const pdfName = path.basename(pdfPath, ".pdf");
//     const outputDir = path.join(process.cwd(), "src/uploads/images", pdfName);

//     if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

//     // Get total pages
//     const totalPages = await this.getPdfPageCount(pdfPath);

//     console.log(`Converting PDF "${pdfName}" with ${totalPages} pages...`);

//     for (let i = 1; i <= totalPages; i++) {
//       const options = {
//         format: "png",
//         out_dir: outputDir,
//         out_prefix: pdfName,
//         width: -1, // ✅ Auto (preserves aspect ratio)
//         height: -1,
//         quality: 100,
//         dpi: 300,
//         page: i, // process one page at a time
//       };

//       try {
//         await poppler.convert(pdfPath, options);
//         console.log(`✅ Page ${i} converted to high Resolution successfully`);
//         //  return outputDir;
//       } catch (err: any) {
//         console.warn(
//           `⚠️ Skipping page ${i} due to Poppler error:`,
//           err.message,
//         );
//       }
//     }

//     console.log("PDF conversion complete");

//     return outputDir;
//   }

//   // Utility to count PDF pages
//   private async getPdfPageCount(pdfPath: string): Promise<number> {
//     // Use pdf-poppler's info command
//     const info = await poppler.info(pdfPath);
//     return info.pages || 0;
//   }
// }
import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as poppler from "pdf-poppler";
import sharp from "sharp";

@Injectable()
export class PdfService {
  async convertPDFToImages(pdfPath: string): Promise<string> {
    const pdfName = path.basename(pdfPath, ".pdf");
    const outputDir = path.join(process.cwd(), "src/uploads/images", pdfName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get total pages
    const totalPages = await this.getPdfPageCount(pdfPath);
    console.log(`Converting PDF "${pdfName}" with ${totalPages} pages...`);

    for (let i = 1; i <= totalPages; i++) {
      await this.convertSinglePage(pdfPath, outputDir, pdfName, i);
    }

    console.log("✅ PDF conversion + Sharp optimization complete");
    return outputDir;
  }

  /** ⚡ OPTIMIZED SINGLE PAGE CONVERSION + SHARP PROCESSING */
private async convertSinglePage(pdfPath: string, outputDir: string, pdfName: string, pageNum: number) {
  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: `${pdfName}_page_${pageNum}`,  // bse_page_2
    dpi: 300,
    page: pageNum,           // ✅ Page number (1-indexed)
    singleFile: false,       // ✅ CRITICAL: Allow multiple files
    quality: 100,
    // Remove conflicting options
  };

  console.log(`🔄 Converting page ${pageNum} with options:`, options);

  try {
    // Execute conversion
    await poppler.convert(pdfPath, options);
    
    // ✅ CORRECT filename pattern: bse_page_2-1.png
    const rawPath = path.join(outputDir, `${pdfName}_page_${pageNum}-1.png`);
    
    // Verify file was created
    if (!fs.existsSync(rawPath)) {
      // DEBUG: List all files in output dir
      const files = fs.readdirSync(outputDir);
      console.error(`❌ Expected: ${rawPath}`);
      console.error(`📂 Found files:`, files.slice(0, 5));
      throw new Error(`pdf-poppler failed: ${rawPath} not created`);
    }
    
    console.log(`✅ Raw PNG created: ${path.basename(rawPath)}`);
    
    // Sharp optimization
    const optimizedPath = path.join(outputDir, `${pdfName}_page_${pageNum}_opt.png`);
    await sharp(rawPath)
      .greyscale()
      .normalize()
      .png({ quality: 90, effort: 6 })
      .toFile(optimizedPath);
      
    console.log(`✨ Page ${pageNum} optimized: ${path.basename(optimizedPath)}`);
    
  } catch (error:any) {
    console.error(`❌ Page ${pageNum} poppler error:`, error.message);
    throw error;
  }
}



  /** Utility to count PDF pages */
  private async getPdfPageCount(pdfPath: string): Promise<number> {
    try {
      const info = await poppler.info(pdfPath);
      return info.pages || 0;
    } catch {
      // Fallback: try first page conversion
      await poppler.convert(pdfPath, { 
        format: 'png', 
        out_dir: path.join(process.cwd(), 'temp'), 
        out_prefix: 'info', 
        page: 1,
        single_page: true 
      });
      return 1; // Assume single page if info fails
    }
  }

  /** 🔍 VERIFY DPI OUTPUT (Quality Check) */
  async verifyImageDPI(imagePath: string): Promise<{ dpi: number; ready: boolean;width: number;  
  height: number;  }> {
    const { data, info } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true });
    
    // Check if image meets Tesseract requirements
    const isHighRes = info.width >= 2000 && info.height >= 2800;
    const avgBrightness = data.reduce((a, b) => a + b, 0) / data.length;
    const isBinary = avgBrightness < 100 || avgBrightness > 150;
    
    return {
      dpi: Math.round((info.width / 8.27) * 2.54), // A4 width calc
      ready: isHighRes && isBinary,
      width: info.width,
      height: info.height
    };
  }
}
