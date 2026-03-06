// src/question/question.service.ts
import { Injectable } from '@nestjs/common';

export interface Question {
  question: string;
  options: string[];
  answer?: string; // optional, if answer is known
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

// parseTextToQuestions(ocrText: string): Question[] {
//     const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
//     const questions: Question[] = [];

//     let currentQ: Question = { question: '', options: [] };

//    //options may a,b,c,d or A,B,C,D or roman thats why i have added this line..
//      const optionRegex = /^(?:\(?[A-Da-d0-9]+\)?|i{1,3}|iv)\./;

//     for (const line of lines) {
//       // Detect question start: "Q1", "1.", etc.
//       if (/^(Q\d+|[0-9]+\.)/.test(line)) {
//         if (currentQ.question) questions.push(currentQ);
//         currentQ = { question: line, options: [] };
//       } else if (optionRegex.test(line)) {
//         // Options like "A. option text"
//         currentQ.options.push(line);
//       } else {
//         // Append line to current question if it’s part of the text
//         currentQ.question += ' ' + line;
//       }
//     }

//     // Push last question
//     if (currentQ.question) questions.push(currentQ);

//     return questions;
//   }
parseTextToQuestions(ocrText: string): Question[] {
  // Step 1: Split lines, trim whitespace, remove empty lines
  const lines = ocrText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const questions: Question[] = [];

  let currentQ: Question = { question: '', options: [] };

  // Options may be a,b,c,d or A,B,C,D or Roman numerals i, ii, iii, iv
  const optionRegex = /^(?:\(?[A-Da-d0-9]+\)?|i{1,3}|iv)\./;

  // Detect a vertical column separator line
  const columnLineRegex = /^\s*\|\s*$/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Step 2: Skip column separator lines
    if (columnLineRegex.test(line)) {
      // Merge previous line with next line if exists
      if (i > 0 && i + 1 < lines.length) {
        lines[i + 1] = lines[i - 1] + ' ' + lines[i + 1];
      }
      continue;
    }

    // Step 3: Detect question start (e.g., "Q1", "1.")
    if (/^(Q\d+|[0-9]+\.)/.test(line)) {
      if (currentQ.question) questions.push(currentQ);
      currentQ = { question: line, options: [] };
    } 
    // Step 4: Detect options
    else if (optionRegex.test(line)) {
      currentQ.options.push(line);
    } 
    // Step 5: Append other lines to current question
    else {
      currentQ.question += ' ' + line;
    }
  }

  // Step 6: Push last question
  if (currentQ.question) questions.push(currentQ);

  return questions;
}
}