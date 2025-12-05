import api from "./api";

const noticeService = {
  getNotices: async (page = 1, size = 5) => {
    const response = await api.get("/notices", {
      params: {
        page,
        size
      }
    });
    return response.data;
  },

  deleteNotice: async (id) => {
    const response = await api.delete(`/notices/${id}`);
    return response.data;
  }
};

export default noticeService;
