import { API_ENDPOINT } from "@/constants";
import axios from "axios";

import { LOCAL_STORAGE_AI_NOTE_TOKEN_KEY } from "@/constants";

const authStorage = JSON.stringify(localStorage.getItem("zoro-crm-auth-storage") || "{}");
const state = authStorage?.state || null;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${state?.token}`
  },
});

export { axiosInstance as axios };