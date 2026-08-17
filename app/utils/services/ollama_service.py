import requests


OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_with_ollama(prompt: str):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "qwen3:4b",
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()

    return response.json()["response"]