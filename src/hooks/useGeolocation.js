import { useCallback, useState } from "react";

const useGeolocation = () => {
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("이 브라우저는 위치 서비스를 지원하지 않습니다.");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          switch (err.code) {
            case 1: // PERMISSION_DENIED
              reject("위치 권한이 거부되었습니다.");
              break;
            case 2: // POSITION_UNAVAILABLE
              reject("위치 정보를 확인할 수 없습니다.");
              break;
            case 3: // TIMEOUT
              reject("위치 정보를 가져오지 못했습니다.");
              break;
          }
        }
      );
    });
  }, []);

  return { loading, getCurrentPosition };
};

export default useGeolocation;
