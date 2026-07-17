import axios from "axios";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL = "https://stockanalysis-j2cu.onrender.com";

const api = axios.create({
  baseURL: RENDER_URL, 
  timeout: 600000,
});

export default api;