import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import LabelIcon from "@mui/icons-material/Label";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import foundItemService from "@/features/items/api/foundItemService";
import useApi from "@/hooks/useApi";

function ItemDetailPage() {
  const { id } = useParams();
  const { execute: getFoundItemDetail, loading: foundItemDetailLoading } = useApi(foundItemService.getFoundItemDetail);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      getFoundItemDetail(id)
        .then((res) => setItem(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, getFoundItemDetail]);

  if (foundItemDetailLoading) {
    return <LoadingSpinner />;
  }

  if (!item) {
    return <EmptyData message="해당하는 습득물 정보를 찾을 수 없습니다." />;
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden"
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                width: "100%",
                paddingTop: "100%",
                borderRadius: 4,
                bgcolor: (theme) => alpha(theme.palette.grey[200], 0.5),
                backgroundImage: `url(${item.fdFilePathImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.common.black, 0.05)}`,
                border: "1px solid",
                borderColor: "divider"
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box mb={2}>
              <Chip
                label={item.prdtClNm || "미분류"}
                icon={<LabelIcon style={{ fontSize: 16 }} />}
                sx={{
                  height: 28,
                  fontWeight: 700,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  "& .MuiChip-icon": { color: "primary.main" },
                  mb: 1
                }}
              />
              <Typography variant="h5" fontWeight={800} sx={{ wordBreak: "keep-all", lineHeight: 1.3 }}>
                {item.fdPrdtNm || "습득물명 미상"}
              </Typography>
            </Box>

            <Stack spacing={2} divider={<Divider flexItem sx={{ borderStyle: "dashed" }} />}>
              <Box display="flex" gap={2}>
                <InfoIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                    관리번호
                  </Typography>
                  {item.atcId ? (
                    <Link
                      href={`https://www.lost112.go.kr/find/findDetail.do?ATC_ID=${item.atcId}&FD_SN=${item.fdSn}`}
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" }
                      }}
                    >
                      {item.atcId}-{item.fdSn}
                    </Link>
                  ) : (
                    <Typography variant="body1" fontWeight={500}>
                      정보 없음
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <EventIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                    습득 일시
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.fdYmd ? `${item.fdYmd} ${item.fdHor}시경` : "정보 없음"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <PlaceIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                    습득 장소
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.fdPlace || "정보 없음"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <BusinessIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                    보관 장소
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.depPlace || "정보 없음"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <PhoneIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                    연락처
                  </Typography>
                  {item.tel ? (
                    <Link
                      href={`tel:${item.tel}`}
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" }
                      }}
                    >
                      {item.tel}
                    </Link>
                  ) : (
                    <Typography variant="body1" fontWeight={500}>
                      정보 없음
                    </Typography>
                  )}
                </Box>
              </Box>

              {item.uniq && (
                <Box display="flex" gap={2}>
                  <DescriptionIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                  <Box>
                    <Typography variant="button" color="text.secondary" display="block" gutterBottom>
                      특이사항
                    </Typography>
                    <Typography variant="body1" fontWeight={500} sx={{ whiteSpace: "pre-wrap", color: "text.primary" }}>
                      {item.uniq}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ItemDetailPage;
