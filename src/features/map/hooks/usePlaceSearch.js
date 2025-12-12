import { useCallback, useState } from "react";

const usePlaceSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPlaces = useCallback((query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(query, (result, status) => {
        setLoading(false);
        if (status === window.kakao.maps.services.Status.OK) {
          const formattedResults = result.map((place) => ({
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
            name: place.place_name,
            address: place.address_name || place.road_address_name,
            category: place.category_name
          }));
          setResults(formattedResults);
        } else {
          setResults([]);
        }
      });
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    searchPlaces,
    clearResults
  };
};

export default usePlaceSearch;
