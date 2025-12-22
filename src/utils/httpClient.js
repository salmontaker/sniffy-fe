import axios, { HttpStatusCode } from "axios";

import { store } from "@/app/store";
import { clearUser } from "@/features/auth/slices/authSlice";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const status = response?.status;

    if (status === HttpStatusCode.Unauthorized) {
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  }
);

export default httpClient;
