import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#1E293B",
        borderBottom: "1px solid #334155",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#F8FAFC",
            fontWeight: 700,
          }}
        >
          Dashboard
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            window.location.href = "/student/AI-Quiz";
          }}
          sx={{
            backgroundColor: "#334155",
            color: "#F8FAFC",
            fontWeight: 600,
            textTransform: "none",
            fontSize: 16,
            padding: "8px 24px",
            borderRadius: 20,
            "&:hover": {
              backgroundColor: "#0056D2",
            },
          }}
        >
          Create Quiz
        </Button>
      </Toolbar>
    </AppBar>
  );
}