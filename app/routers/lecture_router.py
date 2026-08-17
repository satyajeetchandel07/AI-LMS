from fastapi import APIRouter, HTTPException

from app.schemas.lecture_schema import (
    LectureCreate,
    LectureUpdate
)

from app.services.lecture_service import (
    create_lecture_service,
    get_all_lectures_service,
    get_lecture_by_id_service,
    update_lecture_service,
    delete_lecture_service,
    get_course_lectures_service
)

router = APIRouter(
    prefix="/lectures",
    tags=["Lecture Module"]
)


@router.post("/")
async def add_lecture(lecture: LectureCreate):

    success, message = await create_lecture_service(lecture)

    if not success:
        raise HTTPException(
            status_code=400,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }


@router.get("/")
async def get_all_lectures():

    return await get_all_lectures_service()


@router.get("/{id}")
async def get_lecture(id: str):

    lecture = await get_lecture_by_id_service(id)

    if not lecture:
        raise HTTPException(
            status_code=404,
            detail="Lecture not found"
        )

    return lecture


@router.put("/{id}")
async def update_lecture(
    id: str,
    lecture: LectureUpdate
):

    updated = await update_lecture_service(
        id,
        lecture
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Lecture not found"
        )

    return {
        "success": True,
        "message": "Lecture updated successfully"
    }


@router.delete("/{id}")
async def delete_lecture(id: str):

    deleted = await delete_lecture_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Lecture not found"
        )

    return {
        "success": True,
        "message": "Lecture deleted successfully"
    }


@router.get("/course/{course_id}")
async def get_course_lectures(course_id: str):

    return await get_course_lectures_service(course_id)