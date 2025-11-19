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
  }
};

export default agencyService;
