import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  refresh: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  }
};

export default authService;
