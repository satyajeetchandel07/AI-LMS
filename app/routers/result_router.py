from fastapi import APIRouter

from app.schemas.result_schema import ResultCreate

from app.services.result_service import (
    submit_test_service
)

router = APIRouter(

    prefix="/results",

    tags=["Result Module"]

)


@router.post("/submit")
async def submit_test(data: ResultCreate):

    return await submit_test_service(data)