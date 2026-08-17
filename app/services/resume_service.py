import json

from app.ai.prompts.resume_prompt import resume_prompt
from app.ai.prompts.ai_providers import generate_ai
from app.database.database import resume_collection
from app.models.resume_model import resume_model


async def analyze_resume_service(student_id, student_name, file_name, resume_text):

    prompt = resume_prompt(resume_text)

    response = generate_ai(prompt)

    data = json.loads(response)

    resume = resume_model({
        "student_id": student_id,
        "student_name": student_name,
        "file_name": file_name,
        **data
    })

    resume_collection.insert_one(resume)

    resume["_id"] = str(resume["_id"])

    return resume