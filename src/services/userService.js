import httpClient from "../utils/httpClient";

const userService = {
  getUser: async (userId) => {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await httpClient.get("/users/me");
    return response.data;
  },

  createUser: async (userData) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
  },

  updateUser: async (userData) => {
    const response = await httpClient.put("/users", userData);
    return response.data;
  },

  deleteUser: async () => {
    const response = await httpClient.delete("/users");
    return response.data;
  }
};

export default userService;
