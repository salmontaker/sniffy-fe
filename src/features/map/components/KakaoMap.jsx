import MyLocationIcon from "@mui/icons-material/MyLocation";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Card, CircularProgress, Fab, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";

import EmptyData from "@/components/common/EmptyData";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";
import useGeolocation from "@/features/map/hooks/useGeolocation";
import agencyService from "@/features/mypage/api/agencyService";
import useApi from "@/hooks/useApi";

const DEFAULT_CENTER = { lat: 37.5666805, lng: 126.9784147 };
const DEFAULT_LEVEL = 5;

function KakaoMap({ searchPlace }) {
  const [_, kakaoMapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS,
    libraries: ["services", "clusterer"]
  });
  const { execute: getAgencies } = useApi(agencyService.getAgencies);
  const { execute: addFavorite, loading: addFavoriteLoading } = useApi(agencyService.addFavorite);
  const { execute: removeFavorite, loading: removeFavoriteLoading } = useApi(agencyService.removeFavorite);
  const { loading: geoLocationLoading, getCurrentPosition } = useGeolocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
  const [agencies, setAgencies] = useState([]);

  const [selectedAgencyId, setSelectedAgencyId] = useState(null);
  const selectedAgency = useMemo(() => {
    return agencies.find((a) => a.id === selectedAgencyId) || null;
  }, [agencies, selectedAgencyId]);

  const fetchCurrentPosition = useCallback(async () => {
    try {
      const coords = await getCurrentPosition();
      setMapCenter({ lat: coords.latitude, lng: coords.longitude });
      setMapLevel(DEFAULT_LEVEL);
    } catch (err) {
      alert(err);
    }
  }, [getCurrentPosition]);

  const fetchAgenciesInBounds = useCallback(async () => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    try {
      const response = await getAgencies(sw.getLat(), ne.getLat(), sw.getLng(), ne.getLng());
      setAgencies(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [map, getAgencies]);

  const handleAgencySelect = (agency) => {
    setSelectedAgencyId((prevId) => (prevId === agency.id ? null : agency.id));
  };

  const handleToggleFavorite = async (agency) => {
    if (!isAuthenticated) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    try {
      if (agency.isFavorite) {
        await removeFavorite(agency.id);
      } else {
        await addFavorite(agency.id);
      }

      fetchAgenciesInBounds();
    } catch (error) {
      console.error("즐겨찾기 처리 중 오류:", error);
      alert("즐겨찾기 처리에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (searchPlace) {
      const newCenter = { lat: searchPlace.lat, lng: searchPlace.lng };
      setMapCenter(newCenter);
      setMapLevel(3);
    }
  }, [searchPlace]);

  useEffect(() => {
    fetchAgenciesInBounds();
  }, [mapCenter, mapLevel, fetchAgenciesInBounds]);

  if (kakaoMapError) {
    return <EmptyData message={kakaoMapError.message ?? "지도를 불러올 수 없습니다"} />;
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        style={{ width: "100%", height: "100%" }}
        center={mapCenter}
        level={mapLevel}
        onClick={() => setSelectedAgencyId(null)}
        onCreate={setMap}
        onDragEnd={(target) => {
          const center = target.getCenter();
          setMapCenter({ lat: center.getLat(), lng: center.getLng() });
        }}
        onZoomChanged={(target) => setMapLevel(target.getLevel())}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={DEFAULT_LEVEL}
          styles={[
            {
              width: "40px",
              height: "40px",
              textAlign: "center",
              alignContent: "center",
              borderRadius: "50%",
              background: "rgba(33, 150, 243, 0.7)"
            },
            { background: "rgba(165, 214, 167, 0.7)" },
            { background: "rgba(254, 251, 61, 0.7)" }
          ]}
        >
          {agencies.map((agency) => (
            <MapMarker
              key={agency.id}
              position={{
                lat: agency.latitude,
                lng: agency.longitude
              }}
              image={{
                src: `${agency.isFavorite ? "/marker_favorite.svg" : "/marker_normal.svg"}`,
                size: { width: 48, height: 48 },
                options: {
                  offset: {
                    x: 22,
                    y: 40
                  }
                }
              }}
              clickable={true}
              onClick={() => handleAgencySelect(agency)}
            />
          ))}
        </MarkerClusterer>
        {selectedAgency && (
          <CustomOverlayMap
            position={{ lat: selectedAgency.latitude, lng: selectedAgency.longitude }}
            yAnchor={1.4}
            zIndex={1}
            clickable={true}
          >
            <Box component={Card} p={1} minWidth={200} bgcolor="background.paper">
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedAgency.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedAgency.address}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {selectedAgency.tel}
                </Typography>
                <IconButton
                  disabled={addFavoriteLoading || removeFavoriteLoading}
                  size="small"
                  onClick={() => handleToggleFavorite(selectedAgency)}
                  sx={{ color: selectedAgency.isFavorite ? "warning.main" : "text.secondary" }}
                >
                  {selectedAgency.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Box>
            </Box>
          </CustomOverlayMap>
        )}
      </Map>

      <Fab
        size="small"
        onClick={fetchCurrentPosition}
        disabled={geoLocationLoading}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 10,
          bgcolor: "background.paper",
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            bgcolor: "background.paper",
            filter: "brightness(0.8)"
          },
          "&.Mui-disabled": {
            bgcolor: "background.paper",
            filter: "brightness(0.8)",
            opacity: 1
          }
        }}
      >
        {geoLocationLoading ? <CircularProgress size={20} thickness={3} /> : <MyLocationIcon />}
      </Fab>
    </Box>
  );
}

export default KakaoMap;
