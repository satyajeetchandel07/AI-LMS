from datetime import datetime


def create_instructor(instructor):

    return {
        "name": instructor.name,
        "email": instructor.email,
        "phone": instructor.phone,
        "department": instructor.department,
        "qualification": instructor.qualification,
        "experience": instructor.experience,
        "created_at": datetime.utcnow()
    }