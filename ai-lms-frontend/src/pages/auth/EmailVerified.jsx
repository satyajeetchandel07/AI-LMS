import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CustomButton from "../../components/common/CustomButton";

export default function EmailVerified() {
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
          textAlign: "center",
          bgcolor: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 4,
        }}
      >
        <CheckCircleIcon
          sx={{
            color: "#34D399",
            fontSize: 80,
          }}
        />

        <Typography
          mt={2}
          variant="h4"
          color="#F8FAFC"
        >
          Email Verified
        </Typography>

        <Typography
          mt={2}
          color="#94A3B8"
        >
          Your account has been verified successfully.
        </Typography>

        <CustomButton
          fullWidth
          sx={{ mt: 4 }}
        >
          Continue to Login
        </CustomButton>
      </Paper>
    </Box>
  );
}