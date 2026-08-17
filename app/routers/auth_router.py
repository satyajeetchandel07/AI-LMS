from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta
import random

from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    ForgotPassword,
    VerifyOTP,
    ResetPassword,
)

from app.database.database import (
    user_collection,
    otp_collection,
)

from app.auth.password import (
    hash_password,
    verify_password,
)

from app.auth.jwt_handler import (
    create_access_token,
)

from app.models.user_model import create_user

from app.services.email_service import send_otp_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =====================================================
# REGISTER API
# =====================================================

@router.post("/register")
async def register(
    user: UserRegister
):

    # -------------------------------------------------
    # Check Password Match
    # -------------------------------------------------

    if user.password != user.confirm_password:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )

    # -------------------------------------------------
    # Check Existing Email
    # -------------------------------------------------

    existing_user = await user_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing_user:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    # -------------------------------------------------
    # Hash Password
    # -------------------------------------------------

    hashed_password = hash_password(
        user.password
    )

    # -------------------------------------------------
    # Create User Document
    # -------------------------------------------------

    new_user = create_user(
        user,
        hashed_password
    )

    # -------------------------------------------------
    # Save User
    # -------------------------------------------------

    await user_collection.insert_one(
        new_user
    )

    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "success": True,

        "message": "Registration Successful",

        "user": {

            "full_name": user.full_name,

            "email": user.email,

            "role": "student"

        }
    }


# =====================================================
# LOGIN API
# =====================================================

@router.post("/login")
async def login(
    user: UserLogin
):

    # -------------------------------------------------
    # Find User
    # -------------------------------------------------

    db_user = await user_collection.find_one(
        {
            "email": user.email
        }
    )

    if not db_user:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # -------------------------------------------------
    # Verify Password
    # -------------------------------------------------

    if not verify_password(
        user.password,
        db_user["password"]
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )

    # -------------------------------------------------
    # Create JWT Token
    # -------------------------------------------------

    access_token = create_access_token(
        {
            "sub": db_user["email"],
            "role": db_user["role"]
        }
    )

    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "success": True,

        "message": "Login Successful",

        "access_token": access_token,

        "token_type": "Bearer",

        "user": {

            "full_name": db_user["full_name"],

            "email": db_user["email"],

            "role": db_user["role"]

        }
    }


# =====================================================
# FORGOT PASSWORD API
# =====================================================

@router.post("/forgot-password")
async def forgot_password(
    data: ForgotPassword
):

    # -------------------------------------------------
    # Find User
    # -------------------------------------------------

    user = await user_collection.find_one(
        {
            "email": data.email
        }
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # -------------------------------------------------
    # Generate OTP
    # -------------------------------------------------

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    # -------------------------------------------------
    # Remove Previous OTP
    # -------------------------------------------------

    await otp_collection.delete_many(
        {
            "email": data.email
        }
    )

    # -------------------------------------------------
    # Save OTP
    # -------------------------------------------------

    created_at = datetime.utcnow()

    await otp_collection.insert_one({

        "email": data.email,

        "otp": otp,

        "verified": False,

        "created_at": created_at,

        "expires_at": created_at + timedelta(
            minutes=5
        )

    })

    # -------------------------------------------------
    # Send OTP
    # -------------------------------------------------

    try:

        send_otp_email(
            data.email,
            otp
        )

    except Exception as error:

        print(
            "Email sending error:",
            error
        )

        await otp_collection.delete_many(
            {
                "email": data.email
            }
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to send OTP email"
        )

    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "success": True,

        "message": "OTP sent successfully"

    }


# =====================================================
# VERIFY OTP API
# =====================================================

@router.post("/verify-otp")
async def verify_otp(
    data: VerifyOTP
):

    # -------------------------------------------------
    # Find OTP
    # -------------------------------------------------

    otp_data = await otp_collection.find_one({

        "email": data.email,

        "otp": data.otp

    })

    if not otp_data:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )

    # -------------------------------------------------
    # Check Expiration
    # -------------------------------------------------

    if datetime.utcnow() > otp_data["expires_at"]:

        await otp_collection.delete_one(
            {
                "_id": otp_data["_id"]
            }
        )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired"
        )

    # -------------------------------------------------
    # Mark OTP Verified
    # -------------------------------------------------

    await otp_collection.update_one(

        {
            "_id": otp_data["_id"]
        },

        {
            "$set": {
                "verified": True
            }
        }

    )

    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "success": True,

        "message": "OTP verified successfully"

    }


# =====================================================
# RESET PASSWORD API
# =====================================================

@router.post("/reset-password")
async def reset_password(
    data: ResetPassword
):

    # -------------------------------------------------
    # Find Verified OTP
    # -------------------------------------------------

    otp_data = await otp_collection.find_one({

        "email": data.email,

        "otp": data.otp,

        "verified": True

    })

    if not otp_data:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP verification required"
        )

    # -------------------------------------------------
    # Check Expiration
    # -------------------------------------------------

    if datetime.utcnow() > otp_data["expires_at"]:

        await otp_collection.delete_one(
            {
                "_id": otp_data["_id"]
            }
        )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired"
        )

    # -------------------------------------------------
    # Hash New Password
    # -------------------------------------------------

    hashed_password = hash_password(
        data.new_password
    )

    # -------------------------------------------------
    # Update Password
    # -------------------------------------------------

    result = await user_collection.update_one(

        {
            "email": data.email
        },

        {
            "$set": {
                "password": hashed_password
            }
        }

    )

    if result.matched_count == 0:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # -------------------------------------------------
    # Delete Used OTP
    # -------------------------------------------------

    await otp_collection.delete_one(
        {
            "_id": otp_data["_id"]
        }
    )

    # -------------------------------------------------
    # Response
    # -------------------------------------------------

    return {

        "success": True,

        "message": "Password updated successfully"

    }