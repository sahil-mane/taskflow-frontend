import axios from "axios";

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error",error)
    const status = error.response?.status;
    const code = error.response?.data?.code;

    const message =
      error.response?.data?.message || "Something went wrong";

    console.error("API Error:", message);

    // ✅ Token expired / Unauthorized
    if (status === 401 && ["TOKEN_MISSING","TOKEN_EXPIRED"].includes(code)) {
      localStorage.removeItem("token");

      // redirect to login/home
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default apiClient;