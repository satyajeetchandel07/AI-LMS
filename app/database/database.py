from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

from app import database

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGODB_URL)

db = client[DATABASE_NAME]

db = client[DATABASE_NAME]

# Collections
user_collection = db["users"]
student_collection = db["students"]
course_collection = db["courses"]
enrollment_collection = db["enrollments"]
mocktest_collection = db["mocktests"]
question_collection = db["questions"]
result_collection = db["results"]
# result_collection = db["dashboards"]
instructor_collection = db["instructors"]
upload_collection = db["uploads"]
lecture_collection = db["lectures"]
assignment_collection = db["assignments"]
submission_collection = db["submissions"]
attendance_collection = db["attendances"]
announcement_collection = db["announcements"]
notification_collection = db["notifications"]
certificate_collection = db["certificates"]
# dashboard_collection = db["dashboards"]
certificate_collection = db["certificates"]
resume_collection = db["resume_analysis"]
study_planner_collection = db["study_planner"]
# test_collection = db["tests"]
otp_collection = db["otp"]

async def create_database_indexes():

    # MongoDB automatically deletes
    # documents when expires_at is reached.

    await study_planner_collection.create_index(
        "expires_at",
        expireAfterSeconds=0
    )