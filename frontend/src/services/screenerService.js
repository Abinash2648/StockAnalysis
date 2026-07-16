import api from "../api/api";

export const runScreener = async (minScore = "All") => {
  const params = {};

  if (minScore !== "All") {
    params.min_score = minScore;
  }

  const response = await api.get("/api/screener/", {
    params,
  });

  return response.data;
};

export const getCompanyDetails = async (symbol) => {
  const response = await api.get(`/api/company/${symbol}`);
  return response.data;
};

export const getCompanyNews = async (symbol) => {
  const response = await api.get(`/api/news/${symbol}`);
  return response.data;
};