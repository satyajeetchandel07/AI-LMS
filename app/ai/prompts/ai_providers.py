from app.utils.services.huggingface_service import generate_with_huggingface
from app.utils.services.openai_service import generate_with_openai
from app.utils.services.gemini_service import generate_with_gemini
from app.utils.services.ollama_service import generate_with_ollama

AI_PROVIDER = "huggingface"


def generate_ai(prompt: str):

    if AI_PROVIDER == "openai":
        return generate_with_openai(prompt)

    elif AI_PROVIDER == "huggingface":
        return generate_with_huggingface(prompt)

    elif AI_PROVIDER == "gemini":
        return generate_with_gemini(prompt)

    elif AI_PROVIDER == "ollama":
        return generate_with_ollama(prompt)

    raise Exception("Invalid AI Provider")