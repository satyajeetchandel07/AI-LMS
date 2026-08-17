from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.resume_service import analyze_resume_service


router = APIRouter(
    prefix="/resume",
    tags=["Resume Analyzer"]
)


@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...)
):

    MAX_FILE_SIZE = 3 * 1024 * 1024  # 3 MB

    content_bytes = await file.read()

    if len(content_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Resume file size must not exceed 3 MB."
        )

    content = content_bytes.decode(
        "utf-8",
        errors="ignore"
    )

    return await analyze_resume_service(
        student_id="123",
        student_name="Satya",
        file_name=file.filename,
        resume_text=content
    )