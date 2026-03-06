import { Module } from '@nestjs/common';
import { DriveModule } from './drive/drive.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [DriveModule, PdfModule],
  controllers: [],
  providers: [],
})
export class AppModule {}