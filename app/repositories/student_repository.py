from app.database.database import student_collection


async def get_student_by_email(email: str):
    return await student_collection.find_one(
        {"email": email}
    )


async def insert_student(student_data: dict):
    return await student_collection.insert_one(
        student_data
    )


async def get_all_students():

    students = []

    async for student in student_collection.find():

        student["_id"] = str(student["_id"])

        students.append(student)

    return students


async def update_student(email: str, data: dict):

    return await student_collection.update_one(
        {"email": email},
        {"$set": data}
    )


async def delete_student(email: str):

    return await student_collection.delete_one(
        {"email": email}
    )