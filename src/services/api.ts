// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api", // 👉 adapte ton backend
  withCredentials: true, // ⚡ cookies activés
  headers: {
    "Content-Type": "application/json",
  },
});


// 🔹 ajoute automatiquement le token dans les headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;