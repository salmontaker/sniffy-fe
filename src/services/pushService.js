import httpClient from "../utils/httpClient";

const pushService = {
  subscribe: async (subscription) => {
    const response = await httpClient.post("/push-subscriptions", subscription);
    return response.data;
  },

  unsubscribe: async (endpoint) => {
    const response = await httpClient.delete("/push-subscriptions", { data: { endpoint } });
    return response.data;
  }
};

export default pushService;
