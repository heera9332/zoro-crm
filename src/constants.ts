const API_ENDPOINT =
  typeof window !== "undefined" ? window.location.origin : process.env.APP_URL;
const LOCAL_STORAGE_AI_NOTE_TOKEN_KEY = "zoro-crm-storage-key";

export { API_ENDPOINT, LOCAL_STORAGE_AI_NOTE_TOKEN_KEY };
