import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-lms-lrbz.onrender.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
