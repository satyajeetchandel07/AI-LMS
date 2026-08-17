from datetime import datetime


def create_result(result, score, total_marks):

    percentage = round((score / total_marks) * 100, 2)

    return {

        "student_email": result.student_email,

        "test_name": result.test_name,

        "score": score,

        "total_marks": total_marks,

        "percentage": percentage,

        "submitted_at": datetime.utcnow()

    }