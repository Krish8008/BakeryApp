import axios from "axios";

const API = axios.create({
    baseURL: "https://bakeryapp-server.onrender.com/api",
});

// Automatically attach JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export async function sendMessage(message) {
    const response = await API.post("/chat", {
        message,
    });

    return response.data.answer;
}

export async function fetchHistory() {
    const response = await API.get("/chat/history");

    return response.data.history;
}