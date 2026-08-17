import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import OTPInput from "../../components/auth/OTPInput";
import CustomButton from "../../components/common/CustomButton";

import { verifyOTP } from "../../services/authService";

export default function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  // Email received from ForgotPassword page
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [timer, setTimer] = useState(59);


  // ========================================
  // OTP TIMER
  // ========================================

  useEffect(() => {

    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);


  // ========================================
  // VERIFY OTP
  // ========================================

  const handleVerifyOTP = async () => {

    if (!otp || otp.length !== 6) {

      setError("Please enter the 6-digit OTP.");

      return;
    }

    if (!email) {

      setError(
        "Email information is missing. Please request a new OTP."
      );

      return;
    }

    try {

      setLoading(true);

      setError("");
      setMessage("");

      const response = await verifyOTP(
        email,
        otp
      );

      setMessage(response.message);

      // Go to reset password
      setTimeout(() => {

        navigate("/reset-password", {
          state: {
            email: email,
            otp: otp,
          },
        });

      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Invalid OTP."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0F172A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Paper
        sx={{
          width: 470,
          p: 5,
          bgcolor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 4,
          color: "#F8FAFC",
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "#F8FAFC",
          }}
          fontWeight={700}
        >
          Verify OTP
        </Typography>


        <Typography
          mt={1}
          sx={{
            color: "#94A3B8",
          }}
        >
          Enter the 6-digit code sent to your email.
        </Typography>


        {/* Error Message */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 3,
            }}
          >
            {error}
          </Alert>
        )}


        {/* Success Message */}

        {message && (
          <Alert
            severity="success"
            sx={{
              mt: 3,
            }}
          >
            {message}
          </Alert>
        )}


        {/* OTP Input */}

        <Box
          sx={{
            mt: 4,
            mb: 3,
          }}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
          />
        </Box>


        {/* Verify Button */}

        <CustomButton
          fullWidth
          loading={loading}
          onClick={handleVerifyOTP}
        >
          Verify OTP
        </CustomButton>


        {/* Timer */}

        <Typography
          align="center"
          mt={3}
          sx={{
            color: "#64748B",
          }}
        >
          {timer > 0
            ? `Resend code in 00:${String(timer).padStart(2, "0")}`
            : "You can request a new OTP"}
        </Typography>

      </Paper>

    </Box>
  );
}