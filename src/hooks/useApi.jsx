import { useCallback, useState } from "react";

function useApi(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        return await apiFunc(...args);
      } catch (err) {
        setError(err.response?.data?.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { execute, loading, error };
}

export default useApi;
