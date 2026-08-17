import axios from "axios";

const API_URL = "http://localhost:8000";

export const generateStudyPlan = async (data) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.post(
    `${API_URL}/study-planner/generate`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getLatestStudyPlan = async () => {
  const token = localStorage.getItem("access_token");

  const response = await axios.get(
    `${API_URL}/study-planner/latest`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};