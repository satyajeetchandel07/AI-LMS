from fastapi import APIRouter, HTTPException

from app.schemas.question_schema import (
    QuestionCreate,
    QuestionUpdate
)

from app.services.question_service import (
    add_question_service,
    get_questions_service,
    get_question_service,
    update_question_service,
    delete_question_service
)

router = APIRouter(
    prefix="/questions",
    tags=["Question Module"]
)


# -----------------------------
# Add Question
# -----------------------------
@router.post("/")
async def add_question(question: QuestionCreate):

    success, message = await add_question_service(question)

    return {
        "success": success,
        "message": message
    }


# -----------------------------
# Get Questions of Test
# -----------------------------
@router.get("/{test_name}")
async def get_questions(test_name: str):

    return await get_questions_service(test_name)


# -----------------------------
# Get Single Question
# -----------------------------
@router.get("/id/{question_id}")
async def get_question(question_id: str):

    question = await get_question_service(question_id)

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return question


# -----------------------------
# Update Question
# -----------------------------
@router.put("/{question_id}")
async def update_question(
    question_id: str,
    question: QuestionUpdate
):

    updated = await update_question_service(
        question_id,
        question
    )

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return {
        "success": True,
        "message": "Question updated successfully"
    }


# -----------------------------
# Delete Question
# -----------------------------
@router.delete("/{question_id}")
async def delete_question(question_id: str):

    deleted = await delete_question_service(
        question_id
    )

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return {
        "success": True,
        "message": "Question deleted successfully"
    }