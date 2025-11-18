import api from "./api";

const foundItemService = {
  getSampleItems: async () => {
    const response = await api.get("/found-items/samples");
    return response.data;
  }
};

export default foundItemService;
