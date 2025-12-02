import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Card, CardContent, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import useApi from "../../hooks/useApi";
import agencyService from "../../services/agencyService";
import LoadingSpinner from "../common/LoadingSpinner";

const DEFAULT_SIZE = 3;

function FavoriteAgencies() {
  const { execute: getFavoriteAgencies, loading: favoriteAgenciesLoading } = useApi(agencyService.getFavoriteAgencies);
  const { execute: removeFavorite, loading: removeFavoriteLoading } = useApi(agencyService.removeFavorite);
  const [favoriteAgencies, setFavoriteAgencies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFavoriteAgencies = useCallback(async () => {
    try {
      const response = await getFavoriteAgencies(page, DEFAULT_SIZE);
      const { content, totalPages } = response.data;

      setFavoriteAgencies(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [getFavoriteAgencies, page]);

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      if (favoriteAgencies.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchFavoriteAgencies();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchFavoriteAgencies();
  }, [fetchFavoriteAgencies]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        즐겨찾기한 센터
      </Typography>

      {favoriteAgenciesLoading ? (
        <LoadingSpinner />
      ) : favoriteAgencies.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight={300}
          textAlign="center"
        >
          <StarBorderIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            즐겨찾기한 유실물센터가 없습니다
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {favoriteAgencies.map((agency) => (
            <Card
              key={agency.id}
              sx={{
                width: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  borderColor: "primary.main"
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                      {agency.name}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {agency.address}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {agency.telNo}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <IconButton
                    disabled={removeFavoriteLoading}
                    size="small"
                    onClick={() => handleRemoveFavorite(agency.id)}
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {totalPages > 0 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            sx={{ "& .MuiPaginationItem-root": { fontSize: "0.875rem" } }}
          />
        </Stack>
      )}
    </Box>
  );
}

export default FavoriteAgencies;
