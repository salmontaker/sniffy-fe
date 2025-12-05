import httpClient from "../utils/httpClient";

const noticeService = {
  getNotices: async (page = 1, size = 5) => {
    const response = await httpClient.get("/notices", {
      params: {
        page,
        size
      }
    });
    return response.data;
  },

  deleteNotice: async (id) => {
    const response = await httpClient.delete(`/notices/${id}`);
    return response.data;
  }
};

export default noticeService;
