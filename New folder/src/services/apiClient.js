import axios from "axios";
import { API_BASE } from "../utils/constants";

// ─── Axios Instance ────────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// ── Request: attach auth token ──
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fimon_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response: unwrap data, normalise errors ──
apiClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const msg = error.response?.data?.message || error.message || "Network error";
    // Optionally: dispatch a global toast here
    return Promise.reject(new Error(msg));
  }
);

export default apiClient;
