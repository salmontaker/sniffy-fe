import api from "./api";

const pushService = {
  subscribe: async (subscription) => {
    const response = await api.post("/push-subscriptions", subscription);
    return response.data;
  },

  unsubscribe: async (endpoint) => {
    const response = await api.delete("/push-subscriptions", { data: { endpoint } });
    return response.data;
  }
};

export default pushService;
