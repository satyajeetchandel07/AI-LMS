from fastapi import APIRouter

from app.services.recommendation_service import (
    get_recommendation_service
)

router = APIRouter(

    prefix="/recommendation",

    tags=["Recommendation"]

)


@router.get("/{student_id}")

async def recommendation(student_id: str):

    return await get_recommendation_service(student_id)