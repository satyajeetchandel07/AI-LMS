import api from "../api/axios";

// Get Admin Dashboard Statistics
export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};