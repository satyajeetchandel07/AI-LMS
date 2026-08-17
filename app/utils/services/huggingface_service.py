import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

client = InferenceClient(
    api_key=os.getenv("HF_TOKEN")
)


def generate_with_huggingface(prompt: str):

    response = client.chat.completions.create(

        model="Qwen/Qwen3-8B",

        messages=[
            {
                "role": "system",
                "content": "You are an expert AI Quiz Generator, "
                "university study planner, resume analyser and "
                "academic advisor. Always return valid JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3,
        max_tokens=3000

    )

    return response.choices[0].message.content