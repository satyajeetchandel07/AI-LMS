from datetime import datetime
import uuid


def create_certificate(certificate):

    return {

        "certificate_id": str(uuid.uuid4()),

        "student_email": certificate.student_email,

        "student_name": certificate.student_name,

        "course_name": certificate.course_name,

        "instructor_name": certificate.instructor_name,

        "issued_date": datetime.utcnow(),

        "status": "Issued"

    }