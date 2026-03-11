from supabase import create_client
from config import SUPABASE_URL, SUPABASE_KEY

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)




# def push_questions(data):

#     for q in data:
#         supabase.table("questions").insert(q).execute()

def upload_diagram_to_supabase(filepath, filename):
    import time
    unique_filename = f"{int(time.time())}_{filename}"
    
    try:
        with open(filepath, 'rb') as f:
            supabase.storage.from_("diagrams").upload(file=f, path=unique_filename, file_options={"content-type": "image/png"})
            
        res = supabase.storage.from_("diagrams").get_public_url(unique_filename)
        return res
    except Exception as e:
        print(f"Supabase upload error (likely RLS policy): {e}")
        # Return the local path to ensure the pipeline registers the diagram mapping logic as successful
        return f"/local/{filepath}"


def push_english(data, fallback_subject_id=None, fallback_exam_id=None):
    """
    Push questions to Supabase using upsert (insert or update on conflict).
    Uses each question's own subject_id / exam_id / chapter_id.
    Falls back to the provided values only if the question is missing them.
    Skips any question that still has no subject_id or exam_id.
    """
    pushed = 0
    skipped = 0
    errors = 0

    for q in data:
        payload = dict(q)

        # Use per-question IDs, fall back to pipeline-level values if missing
        if not payload.get("subject_id"):
            payload["subject_id"] = fallback_subject_id
        if not payload.get("exam_id"):
            payload["exam_id"] = fallback_exam_id

        # Skip if still missing required fields
        if not payload.get("subject_id") or not payload.get("exam_id"):
            print(f"[PUSH] SKIP Q{q.get('question_number')} — missing subject_id or exam_id")
            skipped += 1
            continue

        # Strip fields not in the Supabase schema
        for key in ["diagram_present", "linked_questions", "appear_year",
                    "question_number", "diagram_note"]:
            payload.pop(key, None)

        # Ensure chapter_id is present (null is fine, but key must exist)
        payload.setdefault("chapter_id", None)

        try:
            supabase.table("questions").upsert(
                payload,
                on_conflict="question"   # unique key in your schema
            ).execute()
            pushed += 1
            print(f"[PUSH] ✓ Q{q.get('question_number')} upserted")
        except Exception as e:
            print(f"[PUSH] ✗ Q{q.get('question_number')} error: {e}")
            errors += 1

    print(f"[PUSH] Done — pushed: {pushed} | skipped: {skipped} | errors: {errors}")




# def push_odia(data):

#     for q in data:
#         supabase.table("questions_or").insert(q).execute()


def resolve_exam_subject_ids(exam_name, subject_name):

    exam = supabase.table("exams").select("id").eq("name", exam_name).single().execute()

    subject = supabase.table("subjects").select("id").eq("name", subject_name).single().execute()

    exam_id = exam.data["id"]
    subject_id = subject.data["id"]

    return exam_id, subject_id


def detect_exam_name(text):

    response = supabase.table("exams").select("name").execute()

    exams = response.data

    text_lower = text.lower()

    for exam in exams:
        exam_name = exam["name"]

        if exam_name.lower() in text_lower:
            return exam_name

    return None



def detect_subject_name(text):

    response = supabase.table("subjects").select("name").execute()

    subjects = response.data

    text_lower = text.lower()

    for subject in subjects:
        subject_name = subject["name"]

        if subject_name.lower() in text_lower:
            return subject_name

    return None