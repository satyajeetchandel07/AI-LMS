import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=api_key
)


def generate_with_gemini(prompt):

    response = client.models.generate_content(
        model="gemini-3.5-flash",             #Gemini 3.1 Flash Lite, Gemini 3.5 Flash better one
        contents=prompt
    )

    return response.text