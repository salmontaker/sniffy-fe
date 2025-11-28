import { useCallback, useState } from "react";

const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        return await apiFunc(...args);
      } catch (err) {
        const message = err.response?.data?.message || err.message || "요청 실패";

        const newError = new Error(message);
        newError.data = err.response?.data;
        newError.status = err.response?.status;

        throw newError;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { execute, loading };
};

export default useApi;
