import api from "./api";

const userKeywordService = {
  getKeywords: async () => {
    const response = await api.get("/keywords");
    return response.data;
  },

  createKeyword: async (keyword) => {
    const response = await api.post("/keywords", { keyword });
    return response.data;
  },

  updateKeyword: async (keywordId) => {
    const response = await api.put(`/keywords/${keywordId}`);
    return response.data;
  },

  deleteKeyword: async (keywordId) => {
    const response = await api.delete(`/keywords/${keywordId}`);
    return response.data;
  }
};

export default userKeywordService;
