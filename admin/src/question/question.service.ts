// src/question/question.service.ts
import { Injectable } from '@nestjs/common';

export interface Question {
  question: string;
  options: string[];
pageNum?: number;
  column?: 'left' | 'right';
  pageContext?: string; 
  answer?: string; // optional, if answer is known
}
export interface ColumnResult {
  pageNum: number;
  leftColumn: Buffer;           // Left column image (Sharp PNG buffer)
  rightColumn: Buffer;          // Right column image  
  splitX: number;               // X position of column split (pixels)
  confidence: number;           // Detection confidence (0.0 - 1.0)
  imagePath: string;            // Source image path
}


@Injectable()
export class QuestionService {

  /**
   * Extract structured questions from OCR text
   * @param ocrText Text extracted from OCR
   */
//   extractQuestions(ocrText: string): Question[] {
//     const questions: Question[] = [];

//     // Split by lines
//     const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

//     let currentQuestion: Question | null = null;

//     for (const line of lines) {
//       // Detect question start (assuming it starts with a number + dot)
//       const questionMatch = line.match(/^\d+\.\s*(.*)/);
//       if (questionMatch) {
//         // Save previous question if exists
//         if (currentQuestion) questions.push(currentQuestion);

//         // Start new question
//         currentQuestion = { question: questionMatch[1], options: [] };
//         continue;
//       }

//       // Detect options (lines starting with A/B/C/D or a/b/c/d)
//       const optionMatch = line.match(/^[A-Da-d][\.\)]\s*(.*)/);
//       if (optionMatch && currentQuestion) {
//         currentQuestion.options.push(optionMatch[1]);
//         continue;
//       }

//       // If line is part of question description, append
//       if (currentQuestion && currentQuestion.options.length === 0) {
//         currentQuestion.question += ' ' + line;
//       }
//     }

//     // Push last question
//     if (currentQuestion) questions.push(currentQuestion);

//     return questions;
//   }




parseTextToQuestions(ocrText: string, columns?: ColumnResult[]): Question[] {
  const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const questions: Question[] = [];

  let currentQ: Question = { question: '', options: [] };

  const optionRegex = /^(?:\(?[A-Da-d1-4i]+\)?|[1-4]\.|i{1,3}|iv)\.?/i;
//   const columnLineRegex = /^\s*\|\s*$/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/[|│┃¦]/g, '').trim();

    // if (columnLineRegex.test(line)) continue;

    const pageContext = columns ? this.getPageContext(lines.slice(0, i).join('\n')) : '';

    if (/^(Q?\d+|[0-9]+\.)/i.test(line)) {
      if (currentQ.question) {
        // ✅ FIXED: Explicit assignment
        questions.push({
          ...currentQ,
          pageContext: currentQ.pageContext || pageContext  // Explicit initializer
        });
      }
      currentQ = { 
        question: line, 
        options: [],
        pageContext: pageContext  // ✅ Initialize here
      };
    } else if (optionRegex.test(line)) {
      currentQ.options.push(line);
    } else {
      currentQ.question += ' ' + line;
    }
  }

  // Final question
  if (currentQ.question) {
    questions.push({
      ...currentQ,
      pageContext: currentQ.pageContext || ''  // ✅ Explicit
    });
  }

  return questions;
}
// parseTextToQuestions(ocrText: string): Question[] {

//   const lines = ocrText
//     .split('\n')
//     .map(l => l.trim())
//     .filter(l => l.length > 0);

//   const questions: Question[] = [];

//   const questionRegex = /^\d+\./;
//   const optionRegex = /^\[[A-D]\]/i;

//   let currentQuestion: Question | null = null;

//   for (const line of lines) {

//     // New question
//     if (questionRegex.test(line)) {

//       if (currentQuestion) {
//         questions.push(currentQuestion);
//       }

//       currentQuestion = {
//         question: line,
//         options: []
//       };

//       continue;
//     }

//     // Option line
//     if (optionRegex.test(line)) {

//       if (currentQuestion) {
//         currentQuestion.options.push(line);
//       }

//       continue;
//     }

//     // Continue question text
//     if (currentQuestion) {
//       currentQuestion.question += " " + line;
//     }

//   }

//   if (currentQuestion) {
//     questions.push(currentQuestion);
//   }

//   return questions;
// }

private getPageContext(text: string): string {
  const pageMatch = text.match(/--- PAGE (\d+) (LEFT|RIGHT) ---/i);
  return pageMatch ? `Page ${pageMatch[1]} (${pageMatch[2]})` : '';
}
}
// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class QuestionService {

//   parseTextToQuestions(text: string, columns?: any[]): any[] {

//     if (!text) return [];

//     // -----------------------------
//     // STEP 1: Clean OCR garbage
//     // -----------------------------
//     let cleaned = text;

//     cleaned = cleaned
//       .replace(/--- PAGE \d+ LEFT ---/g, "\n")
//       .replace(/--- PAGE \d+ RIGHT ---/g, "\n")
//       .replace(/\r/g, "")
//       .replace(/[|]/g, "")
//       .replace(/[~`]/g, "")
//       .replace(/\s+/g, " ")
//       .replace(/\. /g, ".\n") // ensure question split
//       .replace(/\(A\)/g, "\n(A)")
//       .replace(/\(B\)/g, "\n(B)")
//       .replace(/\(C\)/g, "\n(C)")
//       .replace(/\(D\)/g, "\n(D)");

//     // -----------------------------
//     // STEP 2: Split Questions
//     // -----------------------------
//     const questionBlocks = cleaned.split(/\n(?=\d+\.)/);

//     const questions = [];

//     for (let block of questionBlocks) {

//       block = block.trim();

//       if (!block.match(/^\d+\./)) continue;

//       const numberMatch = block.match(/^(\d+)\./);

//       if (!numberMatch) continue;

//       const questionNumber = parseInt(numberMatch[1]);

//       // -----------------------------
//       // Extract Question Text
//       // -----------------------------
//       const qTextMatch = block.match(/^\d+\.\s*(.*?)(?=\n\(A\))/s);

//       if (!qTextMatch) continue;

//       let questionText = qTextMatch[1]
//         .replace(/\n/g, " ")
//         .trim();

//       // -----------------------------
//       // Extract Options
//       // -----------------------------
//       const options = [];

//       const optionRegex = /\((A|B|C|D)\)\s*([^()]+)/g;

//       let match;

//       while ((match = optionRegex.exec(block)) !== null) {

//         const optionText = match[2]
//           .replace(/\n/g, " ")
//           .replace(/\s+/g, " ")
//           .trim();

//         options.push(optionText);
//       }

//       if (options.length === 0) continue;

//       questions.push({
//         questionNumber,
//         question: questionText,
//         options,
//         pageContext: ""
//       });
//     }

//     return questions;
//   }
// }