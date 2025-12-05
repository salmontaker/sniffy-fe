import httpClient from "../utils/httpClient";

const authService = {
  login: async (credentials) => {
    const response = await httpClient.post("/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await httpClient.post("/auth/logout");
    return response.data;
  },

  refresh: async () => {
    const response = await httpClient.post("/auth/refresh");
    return response.data;
  }
};

export default authService;
