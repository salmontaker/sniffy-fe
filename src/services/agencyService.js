import httpClient from "../utils/httpClient";

const agencyService = {
  getAgencies: async (minLatitude, maxLatitude, minLongitude, maxLongitude) => {
    const response = await httpClient.get("/agencies", {
      params: {
        minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude
      }
    });
    return response.data;
  },

  getFavoriteAgencies: async (page = 1, size = 3) => {
    const response = await httpClient.get("/agencies/favorites", { params: { page, size } });
    return response.data;
  },

  addFavorite: async (id) => {
    const response = await httpClient.post(`/agencies/favorites/${id}`);
    return response.data;
  },

  removeFavorite: async (id) => {
    const response = await httpClient.delete(`/agencies/favorites/${id}`);
    return response.data;
  }
};

export default agencyService;
