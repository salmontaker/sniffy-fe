import axios, { HttpStatusCode } from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // 인증 실패시 토큰 폐기
    if (status === HttpStatusCode.Unauthorized) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  }
);

export default api;
