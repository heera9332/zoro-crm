import { API_ENDPOINT } from "@/constants";
import axios from "axios";

import { LOCAL_STORAGE_AI_NOTE_TOKEN_KEY } from "@/constants";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as axios };