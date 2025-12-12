import httpClient from "@/utils/httpClient";

const statsService = {
  getFoundItemTotals: async () => {
    const response = await httpClient.get("/stats/found-items");
    return response.data;
  },

  getTop5Agencies: async () => {
    const response = await httpClient.get("/stats/top5-agencies");
    return response.data;
  },

  getTop5Categories: async () => {
    const response = await httpClient.get("/stats/top5-categories");
    return response.data;
  }
};

export default statsService;
