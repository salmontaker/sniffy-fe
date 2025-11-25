import api from "./api";

const userService = {
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  updateUser: async (userData) => {
    const response = await api.put("/users", userData);
    return response.data;
  },

  deleteUser: async () => {
    const response = await api.delete("/users");
    return response.data;
  }
};

export default userService;
