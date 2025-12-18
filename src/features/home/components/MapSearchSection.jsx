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
import { alpha } from "@mui/material/styles";
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
      <Typography variant="h6" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
        <LocationOnIcon color="primary" /> 내 주변 유실물센터 찾기
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component="form" position="relative" mb={3}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <TextField
                  placeholder="예: 서울역, 강남역 등"
                  variant="outlined"
                  fullWidth
                  value={query}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                      borderRadius: 3,
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "2px"
                      }
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSearch}
                  disabled={!query.trim() || loading}
                  sx={{
                    px: 3,
                    height: 54,
                    borderRadius: 3,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    minWidth: "fit-content",
                    boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
                  }}
                >
                  검색
                </Button>
              </Box>

              {showResults && (
                <Box
                  position="absolute"
                  top="calc(100% + 8px)"
                  left={0}
                  right={0}
                  zIndex={100}
                  bgcolor="background.paper"
                  borderRadius={3}
                  boxShadow="0 12px 32px rgba(0,0,0,0.12)"
                  maxHeight={300}
                  overflow="auto"
                  border="1px solid"
                  borderColor="divider"
                >
                  {results.length > 0 ? (
                    <List dense sx={{ p: 1 }}>
                      {results.map((result, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            onClick={() => handleResultClick(result)}
                            selected={place?.name === result.name}
                            sx={{ borderRadius: 2, mb: 0.5 }}
                          >
                            <Box display="flex" alignItems="center" gap={1.5} width="100%">
                              <LocationOnIcon sx={{ color: "primary.light", fontSize: 20 }} />
                              <ListItemText
                                primary={result.name}
                                secondary={result.address}
                                slotProps={{
                                  primary: { variant: "body2", fontWeight: 600 },
                                  secondary: { variant: "caption" }
                                }}
                              />
                            </Box>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box p={3} textAlign="center">
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
            sx={{
              width: "100%",
              height: { xs: 280, sm: 400 },
              bgcolor: "grey.50",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              position: "relative"
            }}
          >
            <KakaoMap searchPlace={place} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MapSearchSection;
