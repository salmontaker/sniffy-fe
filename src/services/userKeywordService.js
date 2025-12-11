import httpClient from "../utils/httpClient";

const userKeywordService = {
  getKeywords: async () => {
    const response = await httpClient.get("/keywords");
    return response.data;
  },

  createKeyword: async (keyword) => {
    const response = await httpClient.post("/keywords", { keyword });
    return response.data;
  },

  deleteKeyword: async (keywordId) => {
    const response = await httpClient.delete(`/keywords/${keywordId}`);
    return response.data;
  }
};

export default userKeywordService;
