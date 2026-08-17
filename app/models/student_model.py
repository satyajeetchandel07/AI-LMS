from datetime import datetime


def create_student(student):

    return {

        "full_name": student.full_name,
        "email": student.email,
        "phone": student.phone,
        "department": student.department,
        "semester": student.semester,
        "created_at": datetime.utcnow()

    }