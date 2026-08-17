import api from "../api/axios";

// Get attendance for a specific student
export const getStudentAttendance = async (studentEmail) => {
  const response = await api.get(
    `/attendance/student/${encodeURIComponent(studentEmail)}`
  );

  return response.data;
};