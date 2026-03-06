# Scanned PDF Question Extraction System (Production Architecture)

## Overview

A production-grade pipeline to ingest scanned PDF question papers,
extract questions using OCR, and store them in a structured database for
use in an exam platform.

------------------------------------------------------------------------

# 1. High-Level Architecture

React Admin Panel\
→ Backend API (Node / Express)\
→ Google Drive (PDF Storage)\
→ Database (Supabase / PostgreSQL)\
→ Job Queue (Redis / BullMQ)\
→ OCR Worker Service (Python)\
→ Questions Database\
→ React Dashboard (view results)

Processing is **asynchronous** to prevent upload delays.

------------------------------------------------------------------------

# 2. Storage Strategy

PDF files are stored in Google Drive.

Database only stores metadata.

### Table: pdf_documents

Fields: - id - file_name - drive_file_id - status - total_pages -
extracted_questions - created_at - processed_at - error_message

### Status Lifecycle

uploaded\
queued\
processing\
parsed\
completed\
failed

------------------------------------------------------------------------

# 3. Upload Flow

1.  Admin uploads PDF
2.  Backend receives file
3.  File uploaded to Google Drive
4.  Database record created
5.  OCR job pushed to queue

Upload request ends immediately after job creation.

------------------------------------------------------------------------

# 4. Job Queue

Recommended queue technologies: - Redis + BullMQ - RabbitMQ - Kafka

Queue payload example:

-   pdf_id
-   drive_file_id
-   file_name

Workers fetch jobs from queue.

------------------------------------------------------------------------

# 5. OCR Worker Service

A separate Python service handles extraction.

Responsibilities:

1.  Fetch job from queue
2.  Download PDF from Drive
3.  Convert pages to images
4.  Image preprocessing
5.  OCR text extraction
6.  Layout parsing
7.  Question detection
8.  Insert questions into database
9.  Update document status

OCR Engine: Tesseract OCR

------------------------------------------------------------------------

# 6. Image Processing Pipeline

PDF Page\
→ Grayscale conversion\
→ Noise removal\
→ Deskew (fix tilted scans)\
→ Adaptive thresholding\
→ Text segmentation\
→ OCR

This improves recognition accuracy significantly.

------------------------------------------------------------------------

# 7. Layout Detection

Exam papers commonly use patterns:

1.  
2.  
3.  

or

Q1 Q2 Q3

Layout detection separates: - Instructions - Questions - Options -
Diagrams

Detected blocks: - Question block - Option block - Answer block

------------------------------------------------------------------------

# 8. Question Parser

OCR output is messy. Parser converts it to structured format.

Example structure:

question_text\
option_a\
option_b\
option_c\
option_d

Output JSON:

{ question: "", options: \[\], source_pdf:"", page_number: 1 }

------------------------------------------------------------------------

# 9. Question Database

Table: questions

Fields: - id - pdf_id - question_text - option_a - option_b - option_c -
option_d - page_number - created_at

Additional table: question_import_logs

Used for debugging extraction errors.

------------------------------------------------------------------------

# 10. Status Tracking Dashboard

React dashboard shows processing pipeline status.

Example:

  File Name          Status       Questions
  ------------------ ------------ -----------
  math_set1.pdf      processing   0
  physics_2023.pdf   completed    118
  chemistry.pdf      failed       0

------------------------------------------------------------------------

# 11. React Admin Features

Admin interface should allow:

-   Upload PDF
-   View processing status
-   Preview extracted questions
-   Edit extracted questions
-   Approve import

This acts as a moderation layer because OCR is never perfect.

------------------------------------------------------------------------

# 12. Scaling Strategy

When workload increases:

-   Multiple OCR workers
-   Multiple parsing workers

Queue distributes jobs automatically.

This allows processing thousands of PDFs.

------------------------------------------------------------------------

# 13. Folder Structure

Backend

backend/ - api/ - services/ - drive/ - queue/ - database/

OCR Service

ocr-service/ - downloader/ - preprocessing/ - ocr_engine/ - parser/ -
database/

Frontend

frontend/ - admin/ - uploads/ - question_preview/ -
processing_dashboard/

------------------------------------------------------------------------

# 14. Monitoring

Track system metrics:

-   OCR processing time per PDF
-   Extraction accuracy
-   Failed jobs
-   Queue backlog

Store logs for debugging.

------------------------------------------------------------------------

# 15. Optional AI Upgrade

Later improvements:

AI-based parsing for: - Question text - Option boundaries - Correct
answer detection - Marks

This significantly improves accuracy for messy scans.

------------------------------------------------------------------------

# Summary

Pipeline:

Upload PDF → Store in Drive → Queue Job → OCR Worker → Parse Questions →
Save to Database → View in React Dashboard

This architecture supports scalable automated question extraction for
exam platforms.
