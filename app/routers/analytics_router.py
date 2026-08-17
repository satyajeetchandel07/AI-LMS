from fastapi import APIRouter

from app.services.analytics_service import (
    get_student_analytics_service
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/{student_id}")

async def analytics(student_id: str):

    return await get_student_analytics_service(
        student_id
    )