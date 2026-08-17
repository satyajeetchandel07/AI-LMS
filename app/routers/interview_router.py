from fastapi import APIRouter

from app.schemas.interview_schema import InterviewRequest
from app.services.interview_service import generate_interview_question_service

router = APIRouter(
    prefix="/interview",
    tags=["AI Interview"]
)


@router.post("/generate")
async def generate_question(data: InterviewRequest):

    return await generate_interview_question_service(data)