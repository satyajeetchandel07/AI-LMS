import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0F172A" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}