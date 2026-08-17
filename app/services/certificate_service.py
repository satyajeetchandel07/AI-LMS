from bson import ObjectId

from app.database.database import certificate_collection
from app.models.certificate_model import create_certificate


async def create_certificate_service(certificate):

    existing = await certificate_collection.find_one(
        {
            "student_email": certificate.student_email,
            "course_name": certificate.course_name
        }
    )

    if existing:
        return False, "Certificate already exists"

    data = create_certificate(certificate)

    await certificate_collection.insert_one(data)

    return True, "Certificate generated successfully"


async def get_all_certificates_service():

    certificates = []

    async for certificate in certificate_collection.find():

        certificate["_id"] = str(certificate["_id"])

        certificates.append(certificate)

    return certificates


async def get_certificate_by_id_service(id):

    certificate = await certificate_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if not certificate:
        return None

    certificate["_id"] = str(certificate["_id"])

    return certificate


async def delete_certificate_service(id):

    result = await certificate_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    return result.deleted_count