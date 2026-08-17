from app.database.database import (
    attendance_collection,
    assignment_collection,
    result_collection,
    enrollment_collection,
    certificate_collection,
    question_collection
)


async def get_student_analytics_service(student_id: str):

    attendance = attendance_collection.find_one(
        {"student_id": student_id}
    )

    attendance_percentage = 0

    if attendance:
        attendance_percentage = attendance.get(
            "attendance_percentage",
            0
        )

    assignments_completed = assignment_collection.count_documents(
        {"student_id": student_id}
    )

    quizzes_attempted = question_collection.count_documents(
        {"student_id": student_id}
    )

    enrolled_courses = enrollment_collection.count_documents(
        {"student_id": student_id}
    )

    certificates_earned = certificate_collection.count_documents(
        {"student_id": student_id}
    )

    results = list(
        result_collection.find(
            {"student_id": student_id}
        )
    )

    average_marks = 0

    if results:

        total = sum(r.get("marks", 0) for r in results)

        average_marks = round(total / len(results), 2)

    recommendations = []

    if attendance_percentage < 75:

        recommendations.append(
            "Improve attendance."
        )

    if average_marks < 40:

        recommendations.append(
            "Practice previous year questions."
        )

    if assignments_completed < 5:

        recommendations.append(
            "Submit remaining assignments."
        )

    return {

        "student_id": student_id,

        "attendance_percentage": attendance_percentage,

        "assignments_completed": assignments_completed,

        "quizzes_attempted": quizzes_attempted,

        "average_marks": average_marks,

        "enrolled_courses": enrolled_courses,

        "certificates_earned": certificates_earned,

        "recommendations": recommendations
    }