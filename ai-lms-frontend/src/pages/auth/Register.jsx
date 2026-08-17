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
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      await register(form);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration Failed"
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
          width: 500,
          p: 5,
          bgcolor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#F8FAFC" }}
          fontWeight={700}
        >
          Create Account
        </Typography>

        <Typography
          style={{ color: "#94A3B8" }}
          mt={1}
          mb={3}
        >
          Join AI-LMS
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Confirm Password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            height: 48,
            bgcolor: "#0056D2",
          }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: "#fff" }}
            />
          ) : (
            "Register"
          )}
        </Button>

        <Box
          mt={3}
          textAlign="center"
        >
          <Link
            component={RouterLink}
            to="/"
            underline="none"
          >
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}