# from app.utils.services.openai_service import generate_with_openai
from app.utils.services.gemini_service import generate_with_gemini
# from app.utils.services.ollama_service import generate_with_ollama


async def generate_ai_response_service(prompt):

    answer = generate_with_gemini(prompt)

    return {
        "success": True,
        "response": answer
    }