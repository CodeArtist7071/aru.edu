import { Injectable } from "@nestjs/common";

@Injectable()
export class QuestionParserService {

parseQuestions(ocrText: string) {

  const questions: any[] = [];

  // ---- CLEAN OCR ----
  let text = ocrText
    .replace(/\r/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/--- PAGE.*?---/gi, "")
    .replace(/\(\s*8\s*\)/g, "(B)")     // OCR fix
    .replace(/\(\s*0\s*\)/g, "(D)")     // OCR fix
    .replace(/—/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  // ---- TOKENIZE ----
  const tokens = text.split(/(\d+\.\s|\([A-D]\))/).filter(Boolean);

  let currentQuestion: any = null;
  let currentOption = -1;

  for (let token of tokens) {

    token = token.trim();

    // Detect Question
    if (/^\d+\.$/.test(token.trim())) {

      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      currentQuestion = {
        questionNumber: parseInt(token),
        question: "",
        options: []
      };

      currentOption = -1;
      continue;
    }

    // Detect Options
    if (/^\([A-D]\)$/.test(token)) {

      currentOption++;

      if (currentQuestion) {
        currentQuestion.options[currentOption] = "";
      }

      continue;
    }

    // Add content
    if (currentQuestion) {

      if (currentOption === -1) {
        currentQuestion.question += " " + token;
      } else {
        currentQuestion.options[currentOption] += " " + token;
      }

    }

  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  // Cleanup
  return questions.map(q => ({
    questionNumber: q.questionNumber,
    question: q.question.trim(),
    options: q.options.map((o: string) => o.trim())
  }));
}
}