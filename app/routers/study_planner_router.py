from fastapi import APIRouter, Depends

from app.schemas.study_planner_schema import StudyPlannerRequest

from app.services.study_planner_service import (
    generate_study_plan_service,
    get_latest_study_plan_service
)

from app.auth.jwt_handler import get_current_user


router = APIRouter(
    prefix="/study-planner",
    tags=["Study Planner"]
)


# =====================================================
# GENERATE STUDY PLAN
# =====================================================

@router.post("/generate")
async def generate_plan(
    data: StudyPlannerRequest,
    current_user: dict = Depends(get_current_user)
):

    return await generate_study_plan_service(
        data,
        current_user
    )


# =====================================================
# GET LATEST STUDY PLAN
# =====================================================

@router.get("/latest")
async def get_latest_study_plan(
    current_user: dict = Depends(get_current_user)
):

    return await get_latest_study_plan_service(
        current_user
    )