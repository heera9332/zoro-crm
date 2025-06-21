import { API_ENDPOINT } from "@/constants";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to inject the token **on the client only**
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // only runs in the browser
      const raw = localStorage.getItem("zoro-crm-auth-storage");
      let token: string | null = null;
      try {
        if (raw) {
          // Zustand persist format
          const state = JSON.parse(raw);
          token = state?.token;
        }
      } catch (err) {}
      if (token) {
        config.headers["Authorization"] = `JWT ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance as axios };
