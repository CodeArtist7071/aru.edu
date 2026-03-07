import { Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { DriveController } from './drive.controller';
import { PdfModule } from '../pdf/pdf.module';
import { PdfService } from '../pdf/pdf.service';
import { OcrService } from '../ocr/ocr.service';
import { ConfigModule } from '@nestjs/config';
import { QuestionService } from '../question/question.service';
import { ColumnService } from '../question/column.service';
import { QuestionParserService } from '../question/question-parser.service';
import { OcrController } from '../ocr/ocr.controller';

@Module({
  imports: [PdfModule,ConfigModule], 
  providers: [DriveService,PdfService,ColumnService,QuestionParserService, OcrService,QuestionService],
  exports: [DriveService],
  controllers: [DriveController,OcrController],
})
export class DriveModule {}