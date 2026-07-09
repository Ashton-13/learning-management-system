import axios from "axios";

const api = axios.create({
    baseURL: "https://learning-management-system-spwg.onrender.com"
});

// Add JWT access token to every request if user is logged in

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = 
        `Bearer ${token}`;
    }
    return config;
});

export default api;