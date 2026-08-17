from fastapi import APIRouter

from app.schemas.quiz_schema import QuizRequest

from app.services.quiz_service import generate_quiz_service

router = APIRouter(

    prefix="/quiz",

    tags=["AI Quiz"]

)


@router.post("/generate")
async def generate_quiz(data: QuizRequest):

    return await generate_quiz_service(data)