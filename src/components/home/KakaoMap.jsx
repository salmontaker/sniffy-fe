import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Fab, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";

import useApi from "../../hooks/useApi";
import useGeolocation from "../../hooks/useGeolocation";
import agencyService from "../../services/agencyService";
import EmptyData from "./EmptyData";

const DEFAULT_CENTER = { lat: 37.5666805, lng: 126.9784147 };
const DEFAULT_LEVEL = 5;

function KakaoMap() {
  const [_, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS,
    libraries: ["services", "clusterer"]
  });
  const { execute: getAgencies } = useApi(agencyService.getAgencies);
  const { coords, getCurrentPosition } = useGeolocation();

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapLevel, setMapLevel] = useState(DEFAULT_LEVEL);
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);

  const fetchAgenciesInBounds = useCallback(() => {
    if (!map) {
      return;
    }
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    getAgencies(sw.getLat(), ne.getLat(), sw.getLng(), ne.getLng()).then((res) => {
      setAgencies(res.data);
    });
  }, [map, getAgencies]);

  const toggleAgencySelect = (agency) => {
    setSelectedAgency((prev) => (prev?.id === agency.id ? null : agency));
  };

  useEffect(() => {
    if (!coords) {
      return;
    }
    setMapCenter({ lat: coords.latitude, lng: coords.longitude });
    setMapLevel(DEFAULT_LEVEL);
  }, [coords]);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    fetchAgenciesInBounds();
  }, [mapCenter, mapLevel, fetchAgenciesInBounds]);

  if (mapError) {
    return <EmptyData message={mapError.message ?? "지도를 불러올 수 없습니다"} />;
  }

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        style={{ width: "100%", height: "100%" }}
        center={mapCenter}
        level={mapLevel}
        onCreate={setMap}
        onDragEnd={(target) => {
          const center = target.getCenter();
          setMapCenter({ lat: center.getLat(), lng: center.getLng() });
        }}
        onZoomChanged={(target) => setMapLevel(target.getLevel())}
      >
        <MarkerClusterer averageCenter={true} minLevel={DEFAULT_LEVEL}>
          {agencies.map((agency) => (
            <MapMarker
              key={agency.id}
              position={{
                lat: agency.latitude,
                lng: agency.longitude
              }}
              clickable={true}
              onClick={() => toggleAgencySelect(agency)}
            >
              {agency.id === selectedAgency?.id && (
                <Box component="div">
                  <Typography>{agency.name}</Typography>
                </Box>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>
      </Map>

      <Fab
        size="small"
        onClick={getCurrentPosition}
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
          }
        }}
      >
        <MyLocationIcon />
      </Fab>
    </Box>
  );
}

export default KakaoMap;
