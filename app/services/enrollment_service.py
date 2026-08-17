from app.database.database import (
    enrollment_collection,
    student_collection,
    course_collection
)
from app.models.enrollment_model import create_enrollment


# -----------------------------
# Enroll Student
# -----------------------------
async def enroll_student_service(enrollment):

    student = await student_collection.find_one(
        {"email": enrollment.student_email}
    )

    if not student:
        return False, "Student not found"

    course = await course_collection.find_one(
        {"course_code": enrollment.course_code}
    )

    if not course:
        return False, "Course not found"

    existing = await enrollment_collection.find_one(
        {
            "student_email": enrollment.student_email,
            "course_code": enrollment.course_code
        }
    )

    if existing:
        return False, "Student already enrolled"

    enrollment_data = create_enrollment(enrollment)

    await enrollment_collection.insert_one(enrollment_data)

    return True, "Enrollment successful"


# -----------------------------
# Get All Enrollments
# -----------------------------
async def get_all_enrollments_service():

    enrollments = []

    async for enrollment in enrollment_collection.find():

        enrollment["_id"] = str(enrollment["_id"])

        enrollments.append(enrollment)

    return enrollments


# -----------------------------
# Get Courses of Student
# -----------------------------
async def get_student_courses_service(email):

    courses = []

    async for enrollment in enrollment_collection.find(
        {"student_email": email}
    ):

        enrollment["_id"] = str(enrollment["_id"])

        courses.append(enrollment)

    return courses


# -----------------------------
# Get Students of Course
# -----------------------------
async def get_course_students_service(course_code):

    students = []

    async for enrollment in enrollment_collection.find(
        {"course_code": course_code}
    ):

        enrollment["_id"] = str(enrollment["_id"])

        students.append(enrollment)

    return students


# -----------------------------
# Delete Enrollment
# -----------------------------
async def delete_enrollment_service(email, course_code):

    result = await enrollment_collection.delete_one(
        {
            "student_email": email,
            "course_code": course_code
        }
    )

    return result.deleted_count