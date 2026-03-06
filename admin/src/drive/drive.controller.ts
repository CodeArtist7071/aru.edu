import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { DriveService } from "./drive.service";

@Controller("drive")
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  // List all PDFs in Google Drive
  @Get("pdfs")
  async getPDFs() {
    return this.driveService.listPDFs();
  }

  // Download specific PDF
  @Get("download/:id/:name")
  async downloadPDF(@Param("id") id: string, @Param("name") name: string) {
    console.log("Download request received:", id, name);

    return this.driveService.downloadPDF(id, name);
  }

    @Get('process/:id/:name')
  async processPDF(
    @Param('id') fileId: string,
    @Param('name') fileName: string,
  ) {
    try {
      const result = await this.driveService.processPDF(fileId,fileName);

      return {
        status: 'success',
        fileName,
        extractedText: result.extractedText,
        questions: result.questions,
      };
    } catch (error:any) {
      console.error('Error processing PDF:', error);
      throw new HttpException(
        { status: 'error', message: 'Failed to process PDF', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
