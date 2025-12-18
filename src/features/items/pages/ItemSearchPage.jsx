import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import LabelIcon from "@mui/icons-material/Label";
import { Box, Card, CardContent, Chip, Link, Pagination, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import foundItemService from "@/features/items/api/foundItemService";
import ItemSearchForm from "@/features/items/components/ItemSearchForm";
import useApi from "@/hooks/useApi";

function ItemSearchPage() {
  const { execute: getFoundItems, loading: foundItemsLoading } = useApi(foundItemService.getFoundItems);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);

    const fetchFoundItems = async () => {
      try {
        const response = await getFoundItems(params, page);
        const { content, totalPages, totalElements } = response.data;

        setItems(content);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoundItems();
  }, [searchParams, getFoundItems, page]);

  const handleSearchSubmit = (newParams) => {
    setSearchParams({ ...newParams, page: "1" });
  };

  const handlePageChange = (_, value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: String(value) });
  };

  return (
    <>
      <Box mb={4}>
        <ItemSearchForm initialValues={Object.fromEntries(searchParams)} onSubmit={handleSearchSubmit} />
      </Box>

      {foundItemsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {items.length === 0 ? (
            <EmptyData message="검색 조건에 맞는 결과가 없습니다. 다른 검색어로 시도해보세요." />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                총{" "}
                <Box component="span" color="primary.main">
                  {totalElements.toLocaleString()}
                </Box>
                건의 검색 결과가 있어요!
              </Typography>
              {items.map((item) => (
                <Link component={RouterLink} to={`/items/${item.id}`} sx={{ textDecoration: "none" }} key={item.id}>
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: "none",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.common.black, 0.04)}`,
                        borderColor: "primary.main"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                      <Box sx={{ display: "flex", gap: 2.5 }}>
                        <Box
                          sx={{
                            width: 110,
                            height: 110,
                            borderRadius: 3,
                            bgcolor: (theme) => alpha(theme.palette.grey[200], 0.5),
                            backgroundImage: item?.fdFilePathImg ? `url(${item.fdFilePathImg})` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid",
                            borderColor: "divider"
                          }}
                        >
                          {!item?.fdFilePathImg && (
                            <Box
                              component="img"
                              src="/favicon.svg"
                              sx={{
                                width: 40,
                                height: 40,
                                opacity: 0.2,
                                filter: "grayscale(100%)"
                              }}
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            minWidth: 0
                          }}
                        >
                          <Box mb={1}>
                            <Chip
                              label={item.prdtClNm}
                              size="small"
                              icon={<LabelIcon style={{ fontSize: 14 }} />}
                              sx={{
                                height: 24,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                                "& .MuiChip-icon": { color: "primary.main" }
                              }}
                            />
                          </Box>

                          <Typography variant="h6" fontWeight={700} noWrap sx={{ mb: 1, fontSize: "1.1rem" }}>
                            {item.fdPrdtNm}
                          </Typography>

                          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.5, sm: 2 }}>
                            <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                              <BusinessIcon sx={{ fontSize: 16 }} />
                              <Typography variant="body2" fontWeight={500}>
                                {item.agencyName}
                              </Typography>
                            </Box>
                            {item.fdYmd && (
                              <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                                <EventIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2" fontWeight={500}>
                                  {item.fdYmd}
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Box>
          )}

          {totalPages > 0 && (
            <Stack spacing={2} alignItems="center" mt={4}>
              <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange} />
            </Stack>
          )}
        </>
      )}
    </>
  );
}

export default ItemSearchPage;
