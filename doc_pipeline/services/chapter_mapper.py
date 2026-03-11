"""
chapter_mapper.py
Multi-stage chapter mapper using Vertex AI gemini-embedding-001 + Gemini LLM reranker.

Stages:
1. Embed chapter titles once at startup (cached per subject_id) via TextEmbeddingModel.
2. Embed the incoming question text using RETRIEVAL_QUERY task type.
3. Cosine similarity to find the best chapter match.
4. If top-2 are ambiguous (gap < 0.10), ask Gemini to pick the winner.
5. If best confidence < 0.40 threshold, return None (no assignment).
"""

import re
import math
import vertexai
from vertexai.language_models import TextEmbeddingModel, TextEmbeddingInput
from vertexai.generative_models import GenerativeModel
from supabase import create_client
from config import SUPABASE_URL, SUPABASE_KEY, GEMINI_MODEL, PROJECT_ID, REGION

# -------------------------------------------------------
# Init
# -------------------------------------------------------
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

vertexai.init(project=PROJECT_ID, location=REGION)
_embed_model = TextEmbeddingModel.from_pretrained("gemini-embedding-001")
_reranker_model = GenerativeModel(GEMINI_MODEL)

COSINE_THRESHOLD = 0.40
AMBIGUITY_GAP    = 0.10

# -------------------------------------------------------
# Per-subject chapter cache: { subject_id: [ {id, name, vector}, ... ] }
# -------------------------------------------------------
_CHAPTER_CACHE: dict = {}


# -------------------------------------------------------
# HELPERS
# -------------------------------------------------------

def _embed(texts: list[str], task_type: str = "RETRIEVAL_DOCUMENT") -> list[list[float]]:
    """Embed a batch of texts using Vertex AI gemini-embedding-001."""
    inputs = [TextEmbeddingInput(text=t, task_type=task_type) for t in texts]
    results = _embed_model.get_embeddings(inputs)
    return [r.values for r in results]


def _cosine_similarity(a: list, b: list) -> float:
    if not a or not b or len(a) != len(b):
        return 0.0
    dot   = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(x * x for x in b))
    if mag_a == 0 or mag_b == 0:
        return 0.0
    return dot / (mag_a * mag_b)


def _clean_question(text: str) -> str:
    """Strip answer options; keep question stem only."""
    cleaned = re.sub(r'\n\s*[\(\[#]?[A-Da-d1-4][\)\]\.#:]\s.*', '', text)
    return cleaned.strip()[:512]


# -------------------------------------------------------
# PUBLIC API
# -------------------------------------------------------

def get_chapters(subject_id: str) -> list:
    """
    Fetch chapters for a subject_id and embed their titles (cached after first call).
    """
    if subject_id in _CHAPTER_CACHE:
        return _CHAPTER_CACHE[subject_id]

    print(f"[CHAPTER_MAPPER] Fetching chapters for subject {subject_id} ...")
    rows = supabase.table("chapters").select("id,name").eq("subject_id", subject_id).limit(1000).execute().data

    if not rows:
        print(f"[CHAPTER_MAPPER] No chapters found for subject {subject_id}")
        _CHAPTER_CACHE[subject_id] = []
        return []

    print(f"[CHAPTER_MAPPER] Embedding {len(rows)} chapter titles ...")
    try:
        titles = [r["name"] for r in rows]
        vectors = _embed(titles, task_type="RETRIEVAL_DOCUMENT")
        enriched = [
            {"id": rows[i]["id"], "name": rows[i]["name"], "vector": vectors[i]}
            for i in range(len(rows))
        ]
    except Exception as e:
        print(f"[CHAPTER_MAPPER] Batch embedding failed: {e}")
        enriched = []

    _CHAPTER_CACHE[subject_id] = enriched
    print(f"[CHAPTER_MAPPER] {len(enriched)} chapters cached for subject {subject_id}")
    return enriched


def find_chapter_id(question_text: str, subject_id) -> str | None:
    """
    Returns the best matching chapter_id for a question, or None if uncertain.
    """
    if not subject_id:
        return None

    chapters = get_chapters(subject_id)
    if not chapters:
        return None

    clean_q = _clean_question(question_text)
    if not clean_q:
        return None

    # --- Stage 1+2: Embed question and score ---
    try:
        q_vec = _embed([clean_q], task_type="RETRIEVAL_QUERY")[0]
    except Exception as e:
        print(f"[CHAPTER_MAPPER] Question embedding failed: {e}")
        return None

    scored = sorted(
        [(ch, _cosine_similarity(q_vec, ch["vector"])) for ch in chapters],
        key=lambda x: x[1], reverse=True
    )

    best_chapter, best_score     = scored[0]
    second_chapter, second_score = (scored[1] if len(scored) > 1 else (None, 0.0))

    print(f"[CHAPTER_MAPPER] '{clean_q[:60]}' -> '{best_chapter['name']}' ({best_score:.3f})")

    # --- Stage 3: Confidence threshold ---
    if best_score < COSINE_THRESHOLD:
        print(f"[CHAPTER_MAPPER] LOW CONFIDENCE ({best_score:.3f}) - returning null")
        return None

    # --- Stage 4: LLM reranker when ambiguous ---
    if second_chapter and (best_score - second_score) < AMBIGUITY_GAP:
        print(f"[CHAPTER_MAPPER] Ambiguous top-2, invoking Gemini reranker ...")
        winner = _llm_rerank(clean_q, best_chapter["name"], second_chapter["name"])
        if winner == "B":
            print(f"[CHAPTER_MAPPER] Reranker chose: '{second_chapter['name']}'")
            return second_chapter["id"]
        print(f"[CHAPTER_MAPPER] Reranker chose: '{best_chapter['name']}'")

    return best_chapter["id"]


def _llm_rerank(question: str, chapter_a: str, chapter_b: str) -> str:
    """Ask Gemini to choose between two close chapter matches. Returns 'A' or 'B'."""
    prompt = (
        f"Question:\n\"{question}\"\n\n"
        f"Which chapter does it best belong to?\n"
        f"A) {chapter_a}\n"
        f"B) {chapter_b}\n\n"
        f"Reply with only A or B."
    )
    try:
        resp = _reranker_model.generate_content(prompt)
        answer = resp.text.strip().upper()
        return "A" if "A" in answer else "B"
    except Exception as e:
        print(f"[CHAPTER_MAPPER] Reranker failed: {e}")
    return "A"
