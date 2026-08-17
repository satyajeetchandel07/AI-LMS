def resume_prompt(resume_text):

    return f"""
You are an expert HR Recruiter.

Analyze the following resume.

Resume:

{resume_text}

Return ONLY valid JSON.

Format:

{{
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "recommended_roles": [],
    "resume_score": 0,
    "suggestions": []
}}
"""