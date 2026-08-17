from datetime import datetime
from bson import ObjectId

def resume_model(data):
    return {
        "_id": ObjectId(),
        "student_id": data.get("student_id"),
        "student_name": data.get("student_name"),
        "file_name": data.get("file_name"),
        "skills": data.get("skills", []),
        "strengths": data.get("strengths", []),
        "weaknesses": data.get("weaknesses", []),
        "recommended_roles": data.get("recommended_roles", []),
        "resume_score": data.get("resume_score", 0),
        "suggestions": data.get("suggestions", []),
        "created_at": datetime.utcnow()
    }