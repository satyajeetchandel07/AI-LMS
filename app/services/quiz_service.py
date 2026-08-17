import json

from app.utils.services.huggingface_service import generate_with_huggingface


async def generate_quiz_service(data):

    prompt = f"""
You are an expert university professor and quiz creator.

Generate exactly {data.number_of_questions} multiple-choice questions.

Topic:
{data.topic}

Difficulty:
{data.difficulty}

STRICT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use ```json.
4. Do NOT explain anything.
5. Do NOT add introductory or ending text.
6. Each question must contain exactly four options.
7. Answer must be only one option key (A, B, C or D).
8. Questions should not repeat.
9. Questions should match the requested difficulty.

Return ONLY this JSON format:

{{
  "topic": "{data.topic}",
  "difficulty": "{data.difficulty}",
  "questions": [
    {{
      "id": 1,
      "question": "",
      "options": {{
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      }},
      "answer": ""
    }}
  ]
}}
"""

    response = generate_with_huggingface(prompt)

    try:
        quiz = json.loads(response)

        return {
            "success": True,
            "message": "Quiz generated successfully.",
            "data": quiz
        }

    except Exception:

        return {
            "success": False,
            "message": "AI returned invalid JSON.",
            "raw_response": response
        }

# import os
# import json
# from openai import OpenAI
# from dotenv import load_dotenv

# load_dotenv()

# client = OpenAI(
#     api_key=os.getenv("OPENAI_API_KEY")
# )


# async def generate_quiz_service(data):

#     prompt = f"""
# Generate {data.number_of_questions} {data.difficulty} multiple-choice questions on "{data.topic}".

# Return ONLY valid JSON.

# Example:

# [
#     {{
#         "question":"...",
#         "option1":"...",
#         "option2":"...",
#         "option3":"...",
#         "option4":"...",
#         "correct_answer":"option2"
#     }}
# ]
# """

#     response = client.chat.completions.create(

#         model="gpt-3.5-turbo",

#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]

#     )

#     quiz = json.loads(
#         response.choices[0].message.content
#     )

#     return {
#         "success": True,
#         "quiz": quiz
#     }

