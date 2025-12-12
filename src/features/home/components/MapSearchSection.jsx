import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";

import KakaoMap from "@/features/map/components/KakaoMap";
import usePlaceSearch from "@/features/map/hooks/usePlaceSearch";

function MapSearchSection() {
  const [query, setSearchQuery] = useState("");
  const [place, setPlace] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const { results, loading, searchPlaces, clearResults } = usePlaceSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces(query);
    setShowResults(true);
  };

  const handleFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    setPlace(result);
    setShowResults(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    clearResults();
    setShowResults(false);
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={2}>
        🐾 내 물건, 지도에서 찾기
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
          overflow: "hidden"
        }}
      >
        <CardContent>
          <Typography variant="body1" color="text.secondary" mb={2}>
            잃어버린 장소나 주소를 입력해보세요. 근처 유실물센터를 <strong>지도</strong> 위에 표시해드릴게요!
          </Typography>

          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component="form" position="relative">
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <TextField
                  placeholder="예: 서울역, 강남역, 시청 등"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={query}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleSearch}
                  disabled={!query.trim() || loading}
                  sx={{
                    px: 2.5,
                    py: 1,
                    whiteSpace: "nowrap",
                    boxShadow: "none",
                    minWidth: "auto"
                  }}
                >
                  {loading ? "검색중..." : "검색"}
                </Button>
              </Box>

              {showResults && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  zIndex={10}
                  bgcolor="background.paper"
                  borderRadius={2}
                  boxShadow={3}
                  maxHeight={300}
                  overflow="auto"
                  mt={1}
                >
                  {results.length > 0 ? (
                    <List dense>
                      {results.map((result, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            onClick={() => handleResultClick(result)}
                            selected={place?.name === result.name}
                          >
                            <Box display="flex" alignItems="center" gap={1} width="100%">
                              <LocationOnIcon color="action" fontSize="small" />
                              <ListItemText
                                primary={result.name}
                                secondary={
                                  <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      {result.address}
                                    </Typography>
                                    {result.category && (
                                      <Typography variant="caption" color="primary" display="block">
                                        {result.category}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                                slotProps={{
                                  primary: {
                                    fontWeight: place?.name === result.name ? "bold" : "normal"
                                  },
                                  secondary: {
                                    component: "div"
                                  }
                                }}
                              />
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box p={2} textAlign="center">
                      <Typography variant="body2" color="text.secondary">
                        검색 결과가 없습니다
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </ClickAwayListener>

          <Box
            width="100%"
            height={320}
            bgcolor="grey.100"
            border="2px dashed"
            borderColor="grey.300"
            borderRadius={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <KakaoMap searchPlace={place} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MapSearchSection;
