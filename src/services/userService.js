import api from "./api";

const userService = {
  getUser: async (userId) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/user", userData);
    return response.data;
  },

  updateUser: async (userData) => {
    const response = await api.put("/user", userData);
    return response.data;
  },

  deleteUser: async () => {
    const response = await api.delete("/user");
    return response.data;
  }
};

export default userService;
