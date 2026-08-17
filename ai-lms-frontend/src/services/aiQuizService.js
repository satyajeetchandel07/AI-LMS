import api from "../api/axios";

export const generateQuiz = async ({
  topic,
  number_of_questions,
  difficulty,
}) => {
  const response = await api.post("/quiz/generate", {
    topic,
    number_of_questions,
    difficulty,
  });

  return response.data;
};