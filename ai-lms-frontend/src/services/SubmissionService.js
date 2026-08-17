import api from "../api/axios";

// Submit using URL
export const createSubmission = async (submissionData) => {
  const response = await api.post(
    "/submissions/",
    submissionData
  );

  return response.data;
};

// Submit using file
export const uploadSubmission = async (
  assignmentId,
  studentEmail,
  file
) => {
  const formData = new FormData();

  formData.append("assignment_id", assignmentId);
  formData.append("student_email", studentEmail);
  formData.append("file", file);

  const response = await api.post(
    "/submissions/upload",
    formData
  );

  return response.data;
};

// Get submissions of logged-in student
export const getStudentSubmissions = async (studentEmail) => {
  const response = await api.get(
    `/submissions/student/${encodeURIComponent(studentEmail)}`
  );

  return response.data;
};