import api from "./api";

const foundItemService = {
  getFoundItems: async (searchParams, page) => {
    const response = await api.get("/found-items", {
      params: {
        ...searchParams,
        page
      }
    });
    return response.data;
  },

  getSampleItems: async () => {
    const response = await api.get("/found-items/samples");
    return response.data;
  }
};

export default foundItemService;
