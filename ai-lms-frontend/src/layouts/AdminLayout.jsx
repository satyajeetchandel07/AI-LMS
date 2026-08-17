import { Box } from "@mui/material";

import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0F172A",
      }}
    >
      <AdminSidebar />

      <Box
        sx={{
          marginLeft: "250px",
          minHeight: "100vh",
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}