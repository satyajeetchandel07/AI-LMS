from app.database.database import course_collection
from app.models.course_model import create_course


# -----------------------------
# Create Course
# -----------------------------
async def create_course_service(course):

    existing = await course_collection.find_one(
        {"course_code": course.course_code}
    )

    if existing:
        return False, "Course already exists"

    course_data = create_course(course)

    await course_collection.insert_one(course_data)

    return True, "Course created successfully"


# -----------------------------
# Get All Courses
# -----------------------------
async def get_all_courses_service():

    courses = []

    async for course in course_collection.find():

        course["_id"] = str(course["_id"])

        courses.append(course)

    return courses


# -----------------------------
# Get Course By Code
# -----------------------------
async def get_course_by_code_service(course_code):

    course = await course_collection.find_one(
        {"course_code": course_code}
    )

    if course:
        course["_id"] = str(course["_id"])

    return course


# -----------------------------
# Update Course
# -----------------------------
async def update_course_service(course_code, course):

    update_data = {
        k: v
        for k, v in course.model_dump().items()
        if v is not None
    }

    result = await course_collection.update_one(
        {"course_code": course_code},
        {"$set": update_data}
    )

    return result.modified_count


# -----------------------------
# Delete Course
# -----------------------------
async def delete_course_service(course_code):

    result = await course_collection.delete_one(
        {"course_code": course_code}
    )

    return result.deleted_count


# -----------------------------
# Search Course
# -----------------------------
async def search_course_service(course_name):

    courses = []

    async for course in course_collection.find(
        {
            "course_name": {
                "$regex": course_name,
                "$options": "i"
            }
        }
    ):

        course["_id"] = str(course["_id"])

        courses.append(course)

    return courses