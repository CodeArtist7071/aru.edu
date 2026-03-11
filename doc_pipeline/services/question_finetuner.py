"""
question_finetuner.py
Uses Gemini (via Vertex AI SDK) to clean and polish raw OCR-parsed question objects.

For each question it:
  1. Strips stray OCR characters (·, .., *, :, newline leakage into options)
  2. Extracts the clean question stem (removes leaked answer-option noise)
  3. Normalises options so each is a clean, standalone string
  4. Preserves all metadata fields (ids, diagram info, etc.) untouched
"""

import json
import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig
from config import PROJECT_ID, REGION, GEMINI_MODEL

vertexai.init(project=PROJECT_ID, location=REGION)
_model = GenerativeModel(
    GEMINI_MODEL,
    generation_config=GenerationConfig(temperature=0.1, max_output_tokens=1024)
)

SYSTEM_PROMPT = """You are a question paper cleaner. You will receive a raw MCQ question object extracted via OCR from a printed exam paper. The OCR often produces:
- Stray punctuation at the end of question/option text (e.g. ". ", ".. ", " · ", " * ", " :")
- Other questions' option text accidentally merged into the current question's fields
- Newline-separated garbage text inside option values
- Repeated or garbled characters

Your job:
1. Return ONLY a valid JSON object with the SAME keys as input.
2. Clean the "question" field: keep only the actual question sentence. Remove leaked option text (lines starting with A., B., C., D.) and strip trailing noise.
3. Clean each option in "options": keep only the short, clean answer value. Strip leading labels (e.g. "A. "), stray punctuation, and any leaked unrelated content after the first meaningful value.
4. Do NOT change any id fields, boolean fields, urls, null values, or question_number.
5. Do NOT invent or alter the meaning of any text.
6. Output ONLY the cleaned JSON object — no explanation, no markdown fences."""


def _parse_json_safely(text: str) -> dict | None:
    text = text.strip()
    if text.startswith("```"):
        parts = text.split("```")
        text = parts[1] if len(parts) > 1 else text
        if text.startswith("json"):
            text = text[4:]
    text = text.strip().strip("`")
    try:
        return json.loads(text)
    except Exception:
        return None


def finetune_questions(questions: list[dict]) -> list[dict]:
    """
    Clean and polish each question dict using Gemini.
    Immutable metadata fields are always restored from the original.
    """
    IMMUTABLE_KEYS = {
        "question_number", "chapter_id", "subject_id", "exam_id",
        "diagram_present", "diagram_url", "linked_questions",
        "appear_year", "correct_answer"
    }

    finetuned = []
    total = len(questions)

    for i, q in enumerate(questions):
        qn = q.get("question_number", i + 1)
        print(f"[FINETUNER] Processing Q{qn} ({i+1}/{total})")

        prompt = (
            f"{SYSTEM_PROMPT}\n\n"
            f"Raw question object:\n{json.dumps(q, ensure_ascii=False, indent=2)}"
        )

        try:
            response = _model.generate_content(prompt)
            raw_text = response.text.strip()
            cleaned = _parse_json_safely(raw_text)

            if cleaned and isinstance(cleaned, dict):
                # Always restore immutable fields from original
                for key in IMMUTABLE_KEYS:
                    if key in q:
                        cleaned[key] = q[key]
                finetuned.append(cleaned)
                print(f"[FINETUNER] ✓ Q{qn} cleaned")
            else:
                print(f"[FINETUNER] ✗ Q{qn} bad JSON — keeping original")
                finetuned.append(q)

        except Exception as e:
            print(f"[FINETUNER] ✗ Q{qn} error: {e} — keeping original")
            finetuned.append(q)

    return finetuned
