from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENAI_KEY"
)


def generate_with_openai(prompt):

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content