import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import { resetPassword } from "../../services/authService";

export default function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async () => {

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await resetPassword(
        email,
        otp,
        form.password
      );

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.detail ||
        "Unable to reset password."
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
          width: 450,
          p: 5,
          bgcolor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="#F8FAFC"
        >
          Reset Password
        </Typography>

        <Typography
          color="#94A3B8"
          mt={1}
          mb={4}
        >
          Enter your new password.
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {success}
          </Alert>
        )}

        <Stack spacing={3}>

          <CustomInput
            label="New Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <CustomButton
            fullWidth
            loading={loading}
            onClick={handleResetPassword}
          >
            Update Password
          </CustomButton>

        </Stack>

      </Paper>

    </Box>
  );
}