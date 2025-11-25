import { Box, Card, CardContent, Link, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import EmptyData from "../components/common/EmptyData";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ItemSearchForm from "../components/search/ItemSearchForm";
import useApi from "../hooks/useApi";
import foundItemService from "../services/foundItemService";

function SearchPage() {
  const { execute: getFoundItems, loading } = useApi(foundItemService.getFoundItems);
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // URL 파라미터를 객체로 변환 (폼 초기값 및 API 요청용)
  const currentParams = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

  useEffect(() => {
    const nextPage = Math.max(Number(currentParams.page) || 1, 1);
    setPage(nextPage);

    getFoundItems(currentParams, nextPage).then((res) => {
      const data = res.data;
      setItems(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    });
  }, [searchParams, getFoundItems]);

  const handleSearchSubmit = (newParams) => {
    setSearchParams({ ...newParams, page: "1" });
  };

  const handlePageChange = (_, value) => {
    setSearchParams({ ...currentParams, page: String(value) });
  };

  return (
    <>
      <Box mb={4}>
        <ItemSearchForm initialValues={currentParams} onSubmit={handleSearchSubmit} />
      </Box>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {items.length === 0 ? (
            <EmptyData message="검색 조건에 맞는 결과가 없습니다. 다른 검색어로 시도해보세요." />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                총 {totalElements.toLocaleString()}건의 검색 결과가 있어요.
              </Typography>
              {items.map((item) => (
                <Link component={RouterLink} to={`/item/${item.id}`} sx={{ textDecoration: "none" }} key={item.id}>
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: 3,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            bgcolor: "grey.100",
                            backgroundImage: item?.fdFilePathImg ? `url(${item.fdFilePathImg})` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            flexShrink: 0
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} noWrap>
                            {item.fdPrdtNm}
                          </Typography>
                          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              📁 {item.prdtClNm}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              🏛 {item.agencyName}
                            </Typography>
                            {item.fdYmd && (
                              <Typography variant="body2" color="text.secondary">
                                🗓 {item.fdYmd}
                              </Typography>
                            )}
                          </Box>
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
        </>
      )}
    </>
  );
}

export default SearchPage;
