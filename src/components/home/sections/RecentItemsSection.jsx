import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useApi from "@/hooks/useApi";
import foundItemService from "@/services/foundItemService";

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
      <Typography variant="h6" mb={2}>
        🐾 오늘 등록된 습득물
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: "0 3px 8px rgba(0,0,0,0.06)" }}>
        <CardContent>
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
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "transform 0.15s ease, box-shadow 0.15s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }
                      }}
                    >
                      <Box
                        sx={{
                          height: 250,
                          bgcolor: "grey.100",
                          backgroundImage: `url(${item?.fdFilePathImg})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      />

                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.primary" noWrap fontWeight={600}>
                          {item?.fdPrdtNm}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          📁 카테고리: {item?.prdtClNm}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          🗓 습득일: {item?.fdYmd}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          🏛 보관장소: {item?.agencyName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecentItemsSection;
