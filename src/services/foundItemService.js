import httpClient from "../utils/httpClient";

const foundItemService = {
  getFoundItems: async (searchParams, page) => {
    const response = await httpClient.get("/found-items", {
      params: {
        ...searchParams,
        page
      }
    });
    return response.data;
  },

  getFoundItemDetail: async (id) => {
    const response = await httpClient.get(`/found-items/${id}`);
    return response.data;
  },

  getSampleItems: async () => {
    const response = await httpClient.get("/found-items/samples");
    return response.data;
  }
};

export default foundItemService;
