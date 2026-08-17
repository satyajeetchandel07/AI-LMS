from app.database.database import student_collection
from app.models.student_model import create_student


# -----------------------------
# Create Student
# -----------------------------
async def create_student_service(student):

    existing = await student_collection.find_one(
        {"email": student.email}
    )

    if existing:
        return False, "Student already exists"

    student_data = create_student(student)

    await student_collection.insert_one(student_data)

    return True, "Student created successfully"


# -----------------------------
# Get All Students
# -----------------------------
async def get_all_students_service():

    students = []

    async for student in student_collection.find():

        student["_id"] = str(student["_id"])

        students.append(student)

    return students


# -----------------------------
# Get Student By Email
# -----------------------------
async def get_student_by_email_service(email):

    student = await student_collection.find_one(
        {"email": email}
    )

    if student:
        student["_id"] = str(student["_id"])

    return student


# -----------------------------
# Update Student
# -----------------------------
async def update_student_service(email, student):

    update_data = {
        k: v
        for k, v in student.model_dump().items()
        if v is not None
    }

    result = await student_collection.update_one(
        {"email": email},
        {"$set": update_data}
    )

    return result.modified_count


# -----------------------------
# Delete Student
# -----------------------------
async def delete_student_service(email):

    result = await student_collection.delete_one(
        {"email": email}
    )

    return result.deleted_count


# -----------------------------
# Search Student
# -----------------------------
async def search_student_service(name):

    students = []

    async for student in student_collection.find(
        {
            "full_name": {
                "$regex": name,
                "$options": "i"
            }
        }
    ):

        student["_id"] = str(student["_id"])

        students.append(student)

    return students