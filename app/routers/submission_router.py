import os
import uuid

from fastapi import APIRouter, HTTPException, UploadFile, File, Form

from app.schemas.submission_schema import (
    SubmissionCreate,
    SubmissionUpdate
)

from app.services.submission_service import (
    create_submission_service,
    create_file_submission_service,
    get_all_submissions_service,
    get_submission_by_id_service,
    update_submission_service,
    delete_submission_service,
    get_student_submissions_service
)


router = APIRouter(
    prefix="/submissions",
    tags=["Submission Module"]
)


# ==========================================
# SUBMIT ASSIGNMENT USING URL
# ==========================================

@router.post("/")
async def submit_assignment(
    submission: SubmissionCreate
):
    success, message = await create_submission_service(
        submission
    )

    if not success:
        raise HTTPException(
            status_code=400,
            detail=message
        )

    return {
        "success": True,
        "message": message
    }


# ==========================================
# SUBMIT ASSIGNMENT USING FILE
# ==========================================

@router.post("/upload")
async def upload_submission(
    assignment_id: str = Form(...),
    student_email: str = Form(...),
    file: UploadFile = File(...)
):

    MAX_FILE_SIZE = 5 * 1024 * 1024

    # Read file
    file_content = await file.read()

    # Check file size
    if len(file_content) >= MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size must be less than 5 MB."
        )

    # Create upload directory
    upload_directory = "app/uploads/submissions"

    os.makedirs(
        upload_directory,
        exist_ok=True
    )

    # Get extension
    extension = ""

    if file.filename and "." in file.filename:
        extension = os.path.splitext(
            file.filename
        )[1]

    # Generate unique filename
    filename = (
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    file_path = os.path.join(
        upload_directory,
        filename
    )

    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(file_content)

    # Save submission record in MongoDB
    success, message = await create_file_submission_service(
        assignment_id=assignment_id,
        student_email=student_email,
        original_filename=file.filename,
        file_path=file_path
    )

    if not success:
        # Remove uploaded file if database insertion fails
        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=400,
            detail=message
        )

    return {
        "success": True,
        "message": message,
        "assignment_id": assignment_id,
        "student_email": student_email,
        "file_name": file.filename
    }


# ==========================================
# GET ALL SUBMISSIONS
# ==========================================

@router.get("/")
async def get_all_submissions():

    return await get_all_submissions_service()


# ==========================================
# GET SUBMISSION BY ID
# ==========================================

@router.get("/{id}")
async def get_submission(id: str):

    submission = await get_submission_by_id_service(id)

    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Submission not found"
        )

    return submission


# ==========================================
# UPDATE SUBMISSION
# ==========================================

@router.put("/{id}")
async def update_submission(
    id: str,
    submission: SubmissionUpdate
):

    updated = await update_submission_service(
        id,
        submission
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Submission not found"
        )

    return {
        "success": True,
        "message": "Submission updated successfully"
    }


# ==========================================
# DELETE SUBMISSION
# ==========================================

@router.delete("/{id}")
async def delete_submission(id: str):

    deleted = await delete_submission_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Submission not found"
        )

    return {
        "success": True,
        "message": "Submission deleted successfully"
    }


# ==========================================
# GET STUDENT SUBMISSIONS
# ==========================================

@router.get("/student/{student_email}")
async def get_student_submissions(
    student_email: str
):

    return await get_student_submissions_service(
        student_email
    )