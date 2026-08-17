from bson import ObjectId

from app.database.database import (
    question_collection,
    result_collection
)

from app.models.result_model import create_result


async def submit_test_service(data):

    questions = []

    async for question in question_collection.find(
        {"test_name": data.test_name}
    ):
        questions.append(question)

    if len(questions) == 0:

        return {
            "success": False,
            "message": "No questions found"
        }

    score = 0
    total_marks = 0

    for question in questions:

        total_marks += question["marks"]

        for answer in data.answers:

            if str(question["_id"]) == answer.question_id:

                if answer.selected_answer == question["correct_answer"]:

                    score += question["marks"]

    result = create_result(

        data.student_email,

        data.test_name,

        score,

        total_marks

    )

    await result_collection.insert_one(result)

    return {

        "success": True,

        "message": "Test submitted successfully",

        "data": result

    }