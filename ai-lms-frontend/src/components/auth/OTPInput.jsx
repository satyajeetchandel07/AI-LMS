import { Box, TextField } from "@mui/material";

export default function OTPInput() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mt={3}
      mb={3}
    >
      {[...Array(6)].map((_, index) => (
        <TextField
          key={index}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: 24,
            },
          }}
          sx={{
            width: 55,

            "& .MuiOutlinedInput-root": {
              bgcolor: "#0F172A",
              color: "#F8FAFC",
              borderRadius: 3,
            },
          }}
        />
      ))}
    </Box>
  );
}