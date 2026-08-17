def interview_question_prompt(job_role, experience, difficulty, question_number):

    return f"""
You are an expert technical interviewer.

Generate ONE interview question.

Job Role:
{job_role}

Experience:
{experience}

Difficulty:
{difficulty}

Question Number:
{question_number}

Rules:

1. Return ONLY JSON.
2. No markdown.
3. No explanation.

Format:

{{
    "question":"",
    "expected_answer":""
}}
"""