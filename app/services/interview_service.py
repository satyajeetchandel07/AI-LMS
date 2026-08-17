import json

from app.ai.prompts.interview_prompt import interview_question_prompt
from app.ai.prompts.ai_providers import generate_ai


async def generate_interview_question_service(data):

    prompt = interview_question_prompt(
        data.job_role,
        data.experience,
        data.difficulty,
        data.question_number
    )

    response = generate_ai(prompt)

    return json.loads(response)