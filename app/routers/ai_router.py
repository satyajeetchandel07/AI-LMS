from fastapi import APIRouter

from app.schemas.ai_schema import AIRequest

from app.services.ai_service import (
    generate_ai_response_service
)

router = APIRouter(
    prefix="/ai",
    tags=["AI Module"]
)


@router.post("/generate")
async def generate(data: AIRequest):

    return await generate_ai_response_service(
        data.prompt
    )