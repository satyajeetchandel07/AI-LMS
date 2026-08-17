from fastapi import APIRouter

from app.services.dashboard_service import (
    admin_dashboard_service,
    instructor_dashboard_service,
    student_dashboard_service
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/admin")
async def admin_dashboard():

    return await admin_dashboard_service()


@router.get("/instructor/{email}")
async def instructor_dashboard(email: str):

    return await instructor_dashboard_service(email)


@router.get("/student/{email}")
async def student_dashboard(email: str):

    return await student_dashboard_service(email)