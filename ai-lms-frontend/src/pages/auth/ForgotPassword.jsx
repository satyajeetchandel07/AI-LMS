import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      // Backend Integration
      const response = await forgotPassword(email);

      setMessage(response.message);

      // Send email to Verify OTP page
      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: email,
          },
        });
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to send OTP."
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
          Forgot Password
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
          }}
          mt={1}
          mb={3}
        >
          Enter your registered email address.
          We'll send you a One Time Password
          to reset your password.
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {message && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiInputLabel-root": {
              color: "#94A3B8",
            },

            "& .MuiInputBase-input": {
              color: "#F8FAFC",
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#334155",
              },

              "&:hover fieldset": {
                borderColor: "#0056D2",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#0056D2",
              },
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#0056D2",
            height: 48,

            "&:hover": {
              bgcolor: "#0047B3",
            },
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            "Send OTP"
          )}
        </Button>

        <Box
          mt={3}
          textAlign="center"
        >
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{
              color: "#0056D2",
            }}
          >
            Back to Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}