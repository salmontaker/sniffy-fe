import axios, { HttpStatusCode } from "axios";

import tokenManager from "./tokenManager";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

let isRefreshing = false;
let refreshSubscribers = [];

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

// 요청 인터셉터
httpClient.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const status = response?.status;

    if (
      status !== HttpStatusCode.Unauthorized ||
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // 새로운 Promise를 만들어 대기열에 등록하고 리턴 (여기서 멈춤)
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(httpClient(config)); // 새 토큰으로 재요청 후 그 결과를 resolve
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await httpClient.post("/auth/refresh");
      const { accessToken } = response.data.data.accessToken;

      tokenManager.setToken(accessToken);
      onRefreshed(accessToken);

      config.headers.Authorization = `Bearer ${accessToken}`;
      return httpClient(config);
    } catch (refreshError) {
      tokenManager.logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default httpClient;
