# PDF OCR Architecture – Exam Platform

## 1. Overview

This system processes uploaded **exam PDFs**, extracts **questions using OCR**, and stores them in the database so they can be used inside the exam platform.

The architecture is divided into **three main services**:

1. **Frontend (React Admin Panel)** – Upload PDFs and manage questions.
2. **Backend API (Node.js)** – Handles uploads, metadata, database operations, and job queues.
3. **OCR Worker (Python)** – Downloads PDFs, runs OCR, and extracts questions.

The system uses **Google Drive as the PDF storage layer** and processes OCR asynchronously using a **worker service**.

---

# 2. System Architecture

```
React Admin Panel
      │
      │ Upload PDF
      ▼
Backend API (Node)
      │
      │ Upload file
      ▼
Google Drive (PDF Storage)
      │
      │ Save metadata
      ▼
Database (pdf_files table)
      │
      │ status = pending
      ▼
OCR Worker (Python)
      │
      │ Download PDF
      │ Run OCR
      ▼
Question Parser
      │
      ▼
Database (questions table)
```

---

# 3. Project Folder Structure

```
exam-platform
│
├── backend
│   ├── src
│   │   ├── api          # API routes
│   │   ├── services     # Business logic
│   │   ├── queue        # Job queue (OCR tasks)
│   │   ├── drive        # Google Drive integration
│   │   ├── database     # DB configuration
│   │   └── server.ts    # Backend entry point
│
├── ocr-service
│   ├── downloader       # Download PDF from drive
│   ├── preprocessing    # Clean images for OCR
│   ├── parser           # Extract structured questions
│   ├── ocr_engine       # OCR implementation
│   └── worker.py        # Background worker
│
├── frontend
│   └── react-app        # Admin panel
│
└── docs
    └── pdf-ocr-architecture.md
```

---

# 4. Backend Responsibilities

The backend API is responsible for:

* Receiving **PDF uploads**
* Uploading PDFs to **Google Drive**
* Saving file metadata in the database
* Adding OCR processing jobs to the queue
* Serving extracted questions to the frontend

### Backend Modules

| Module   | Purpose                  |
| -------- | ------------------------ |
| api      | HTTP endpoints           |
| services | Business logic           |
| queue    | OCR job queue            |
| drive    | Google Drive integration |
| database | DB connection and models |

---

# 5. OCR Service Responsibilities

The OCR worker runs as a **separate Python service**.

### Tasks

1. Poll job queue
2. Download PDF
3. Convert PDF → images
4. Run OCR
5. Parse questions
6. Store extracted data

### OCR Pipeline

```
PDF
 ↓
Image Conversion
 ↓
Image Preprocessing
 ↓
OCR Engine
 ↓
Text Extraction
 ↓
Question Parser
 ↓
Structured Data
```

---

# 6. Database Tables

### pdf_files

Stores uploaded PDF metadata.

| Column        | Description                 |
| ------------- | --------------------------- |
| id            | UUID                        |
| file_name     | Original file name          |
| drive_file_id | Google Drive ID             |
| status        | pending / processing / done |
| created_at    | Upload time                 |

---

### questions

Stores extracted questions.

| Column         | Description        |
| -------------- | ------------------ |
| id             | UUID               |
| pdf_id         | Reference to PDF   |
| question_text  | Extracted question |
| options        | MCQ options        |
| correct_answer | Correct option     |
| subject_id     | Subject mapping    |

---

# 7. Processing Workflow

### Step 1 — Upload

Admin uploads PDF from React dashboard.

### Step 2 — Storage

Backend uploads PDF to **Google Drive**.

### Step 3 — Metadata

Backend inserts record into `pdf_files`.

```
status = pending
```

### Step 4 — OCR Job

Backend pushes job to **queue**.

### Step 5 — Worker Processing

Python worker:

* downloads PDF
* runs OCR
* extracts questions

### Step 6 — Database Insert

Extracted questions are stored in `questions` table.

---

# 8. Advantages of this Architecture

* **Scalable** – OCR workers can scale horizontally
* **Reliable** – Queue prevents job loss
* **Decoupled** – Backend and OCR services are independent
* **Cloud friendly** – Drive handles storage

---

# 9. Future Improvements

Possible improvements for production:

* Redis queue (BullMQ / Celery)
* Retry mechanism for failed OCR
* Parallel OCR processing
* AI based question extraction
* PDF version tracking
* OCR accuracy improvement

---

# 10. Deployment Plan

| Service    | Technology            |
| ---------- | --------------------- |
| Frontend   | React                 |
| Backend    | Node.js               |
| OCR Worker | Python                |
| Storage    | Google Drive          |
| Database   | PostgreSQL / Supabase |
| Queue      | Redis                 |

---

# End
