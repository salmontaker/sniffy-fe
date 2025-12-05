import api from "./api";

const agencyService = {
  getAgencies: async (minLatitude, maxLatitude, minLongitude, maxLongitude) => {
    const response = await api.get("/agencies", {
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
    const response = await api.get("/agencies/favorites", { params: { page, size } });
    return response.data;
  },

  addFavorite: async (id) => {
    const response = await api.post(`/agencies/favorites/${id}`);
    return response.data;
  },

  removeFavorite: async (id) => {
    const response = await api.delete(`/agencies/favorites/${id}`);
    return response.data;
  }
};

export default agencyService;
