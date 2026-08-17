from fastapi import APIRouter, HTTPException

from app.schemas.certificate_schema import CertificateCreate

from app.services.certificate_service import (

    create_certificate_service,

    get_all_certificates_service,

    get_certificate_by_id_service,

    delete_certificate_service

)

router = APIRouter(

    prefix="/certificates",

    tags=["Certificate Module"]

)


@router.post("/")
async def generate_certificate(certificate: CertificateCreate):

    success, message = await create_certificate_service(certificate)

    if not success:
        raise HTTPException(status_code=400, detail=message)

    return {

        "success": True,

        "message": message

    }


@router.get("/")
async def get_all_certificates():

    return await get_all_certificates_service()


@router.get("/{id}")
async def get_certificate(id: str):

    certificate = await get_certificate_by_id_service(id)

    if not certificate:
        raise HTTPException(
            status_code=404,
            detail="Certificate not found"
        )

    return certificate


@router.delete("/{id}")
async def delete_certificate(id: str):

    deleted = await delete_certificate_service(id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Certificate not found"
        )

    return {

        "success": True,

        "message": "Certificate deleted successfully"

    }