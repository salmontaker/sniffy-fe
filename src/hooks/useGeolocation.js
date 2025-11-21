import { useCallback, useState } from "react";

const useGeolocation = () => {
  const [coords, setCoords] = useState(null);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords(pos.coords);
      },
      (err) => {
        switch (err.code) {
          case 1: // PERMISSION_DENIED
            alert("위치 권한을 허용해 주세요");
            break;
          case 2: // POSITION_UNAVAILABLE
            alert("위치 정보를 확인할 수 없습니다.");
            break;
          case 3: // TIMEOUT
            alert("위치 정보를 가져오지 못했습니다.");
            break;
        }
      }
    );
  }, []);

  return { coords, getCurrentPosition };
};

export default useGeolocation;
