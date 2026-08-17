from fastapi import APIRouter, HTTPException

from app.schemas.mocktest_schema import MockTestCreate

from app.services.mocktest_service import (
    create_mocktest_service,
    get_all_mocktests_service,
    get_mocktest_service,
    delete_mocktest_service
)

router = APIRouter(
    prefix="/mocktests",
    tags=["Mock Test Module"]
)


# Create Mock Test
@router.post("/")
async def create_test(test: MockTestCreate):

    success, message = await create_mocktest_service(test)

    if not success:
        raise HTTPException(
            status_code=409,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }


# Get All Tests
@router.get("/")
async def get_tests():

    return await get_all_mocktests_service()


# Get Test
@router.get("/{test_name}")
async def get_test(test_name: str):

    test = await get_mocktest_service(test_name)

    if not test:
        raise HTTPException(
            status_code=404,
            detail="Mock Test not found"
        )

    return test


# Delete Test
@router.delete("/{test_name}")
async def delete_test(test_name: str):

    deleted = await delete_mocktest_service(test_name)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Mock Test not found"
        )

    return {
        "success": True,
        "message": "Mock Test deleted successfully"
    }