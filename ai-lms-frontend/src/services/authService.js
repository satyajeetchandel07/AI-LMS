import api from "../api/axios";

export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const register = async (data) => {
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};

// ==============================
// Forgot Password
// ==============================

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// ==============================
// Verify OTP
// ==============================

export const verifyOTP = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};

// ==============================
// Reset Password
// ==============================

export const resetPassword = async (
  email,
  otp,
  new_password
) => {
  const response = await api.post("/auth/reset-password", {
    email,
    otp,
    new_password,
  });

  return response.data;
};