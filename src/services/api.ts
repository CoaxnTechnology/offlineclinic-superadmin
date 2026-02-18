import axios from "axios";

const api = axios.create({
  baseURL: "https://api.clinicalgynecologists.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔍 REQUEST DEBUG
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("➡️ REQUEST URL:", config.url);
    console.log("➡️ REQUEST HEADERS:", config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔍 RESPONSE DEBUG
api.interceptors.response.use(
  (response) => {
    console.log("⬅️ RESPONSE DATA:", response.data);
    return response;
  },
  (error) => {
    console.error("⬅️ RESPONSE ERROR:", error.response?.data);
    return Promise.reject(error);
  },
);

export default api;
