# from fastapi import FastAPI
# from app.database.database import db

# app = FastAPI(
#     title="AI LMS",
#     version="1.0.0"
# )

# @app.get("/")
# async def home():
#     return {"message": "AI LMS Backend Running"}

# @app.get("/test-db")
# async def test_db():
#     collections = await db.list_collection_names()
#     return {
#         "status": "Connected Successfully",
#         "collections": collections
#     }


#python -m uvicorn app.main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.auth_router import router as auth_router
from app.routers.student_router import router as student_router
from app.routers.course_router import router as course_router
from app.routers.enrollment_router import router as enrollment_router
from app.routers.mocktest_router import router as mocktest_router
from app.routers.question_router import router as question_router
from app.routers.result_router import router as result_router
from app.routers.quiz_router import router as quiz_router
from app.routers.instructor_router import router as instructor_router
from app.routers.lecture_router import router as lecture_router
from app.routers.assignment_router import router as assignment_router
from app.routers.submission_router import router as submission_router
from app.routers.attendance_router import router as attendance_router
from app.routers.upload_router import router as upload_router
from app.routers.announcement_router import router as announcement_router
from app.routers.dashboard_router import router as dashboard_router
from app.routers.notification_router import router as notification_router
from app.routers.certificate_router import router as certificate_router
from app.routers.ai_router import router as ai_router
from app.routers.interview_router import router as interview_router
from app.routers.resume_router import router as resume_router
from app.routers.study_planner_router import router as study_planner_router
from app.routers.recommendation_router import router as recommendation_router
from app.routers.analytics_router import router as analytics_router
from app.database.database import study_planner_collection



app = FastAPI(
    title="AI LMS",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-lms1.vercel.app",
        "ai-lms1-q1ayig7ys-rdx20.vercel.app",
        "ai-lms1-rdx20.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(auth_router)
# app.include_router(auth_router)
app.include_router(student_router)
app.include_router(course_router)
app.include_router(enrollment_router)
app.include_router(mocktest_router)
app.include_router(question_router)
app.include_router(result_router)
app.include_router(quiz_router)
app.include_router(instructor_router)
app.include_router(lecture_router)
app.include_router(assignment_router)
app.include_router(submission_router)
app.include_router(attendance_router)
app.include_router(upload_router)
app.include_router(announcement_router)
app.include_router(dashboard_router)
app.include_router(notification_router)
app.include_router(certificate_router)
app.include_router(ai_router)
app.include_router(interview_router)
app.include_router(resume_router)
app.include_router(study_planner_router)
app.include_router(recommendation_router)
app.include_router(analytics_router)


@app.on_event("startup")
async def startup():

    await study_planner_collection.create_index(
        "expires_at",
        expireAfterSeconds=0
    )
 # @app.get("/")
 # async def home():
 #     return {
 #         "message": "AI LMS Backend Running"
 #     }
