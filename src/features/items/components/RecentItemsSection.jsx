import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import foundItemService from "@/features/items/api/foundItemService";
import useApi from "@/hooks/useApi";

function RecentItemsSection() {
  const { execute: getSampleItems, loading: sampleItemsLoading } = useApi(foundItemService.getSampleItems);
  const [sampleItems, setSampleItems] = useState([]);

  useEffect(() => {
    getSampleItems()
      .then((res) => setSampleItems(res.data))
      .catch((err) => console.error(err));
  }, [getSampleItems]);

  return (
    <Box mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
          <AutoAwesomeIcon color="primary" /> 최근 등록된 습득물
        </Typography>
        <Link component={RouterLink} to="/search" variant="body2" color="primary" sx={{ fontWeight: 600 }}>
          전체보기
        </Link>
      </Box>

      {sampleItemsLoading ? (
        <LoadingSpinner />
      ) : sampleItems.length === 0 ? (
        <EmptyData message="습득물 데이터가 없습니다" />
      ) : (
        <Grid container spacing={2}>
          {sampleItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <Link component={RouterLink} to={`/items/${item.id}`} sx={{ textDecoration: "none" }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
                      borderColor: "primary.light"
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: "grey.50",
                      backgroundImage: `url(${item?.fdFilePathImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative"
                    }}
                  >
                    {!item?.fdFilePathImg && (
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                      >
                        이미지 없음
                      </Typography>
                    )}
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1} gap={1}>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        fontWeight={700}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {item?.fdPrdtNm}
                      </Typography>
                      <Box
                        sx={{
                          px: 1,
                          py: 0.2,
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                          color: "primary.main",
                          borderRadius: 1,
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {item?.prdtClNm.split(" > ").pop()}
                      </Box>
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.primary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <EventIcon sx={{ fontSize: "0.875rem" }} /> {item?.fdYmd}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.primary"
                      sx={{
                        mt: 0.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        overflow: "hidden"
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: "0.875rem" }} />
                      <Box
                        component="span"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {item?.agencyName}
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default RecentItemsSection;
