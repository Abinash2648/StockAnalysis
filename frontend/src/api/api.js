import axios from "axios";

const api = axios.create({
  baseURL: "https://stockanalysis-j2cu.onrender.com",
  timeout: 600000,
});

export default api;