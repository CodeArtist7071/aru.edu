import { Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { DriveController } from './drive.controller';
import { PdfModule } from '../pdf/pdf.module';
import { PdfService } from '../pdf/pdf.service';
import { OcrService } from '../ocr/ocr.service';
import { ConfigModule } from '@nestjs/config';
import { QuestionService } from '../question/question.service';

@Module({
  imports: [PdfModule,ConfigModule], 
  providers: [DriveService,PdfService,OcrService,QuestionService],
  exports: [DriveService],
  controllers: [DriveController],
})
export class DriveModule {}