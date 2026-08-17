from bson import ObjectId

from app.database.database import question_collection
from app.models.question_model import create_question


# -----------------------------
# Add Question
# -----------------------------
async def add_question_service(question):

    data = create_question(question)

    await question_collection.insert_one(data)

    return True, "Question added successfully"


# -----------------------------
# Get Questions by Test Name
# -----------------------------
async def get_questions_service(test_name):

    questions = []

    async for question in question_collection.find(
        {"test_name": test_name}
    ):

        question["_id"] = str(question["_id"])

        questions.append(question)

    return questions


# -----------------------------
# Get Single Question
# -----------------------------
async def get_question_service(question_id):

    question = await question_collection.find_one(
        {"_id": ObjectId(question_id)}
    )

    if question:
        question["_id"] = str(question["_id"])

    return question


# -----------------------------
# Update Question
# -----------------------------
async def update_question_service(question_id, question):

    update_data = {
        k: v
        for k, v in question.model_dump().items()
        if v is not None
    }

    result = await question_collection.update_one(
        {"_id": ObjectId(question_id)},
        {"$set": update_data}
    )

    return result.modified_count


# -----------------------------
# Delete Question
# -----------------------------
async def delete_question_service(question_id):

    result = await question_collection.delete_one(
        {"_id": ObjectId(question_id)}
    )

    return result.deleted_count