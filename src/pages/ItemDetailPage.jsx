import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EmptyData from "../components/common/EmptyData";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useApi from "../hooks/useApi";
import foundItemService from "../services/foundItemService";

function ItemDetailPage() {
  const { id } = useParams();
  const { execute: getFoundItemDetail, loading, error } = useApi(foundItemService.getFoundItemDetail);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      getFoundItemDetail(id).then((res) => setItem(res.data));
    };

    if (id) {
      fetchItemDetail();
    }
  }, [id, getFoundItemDetail]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <EmptyData message={`Error: ${error.message || "상세 정보를 불러오는 데 실패했습니다."}`} />;
  }

  if (!item) {
    return <EmptyData message="해당하는 습득물 정보를 찾을 수 없습니다." />;
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                width: "100%",
                paddingTop: "100%",
                borderRadius: 2,
                bgcolor: "grey.100",
                backgroundImage: item.fdFilePathImg ? `url(${item.fdFilePathImg})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {item.fdPrdtNm || "습득물명 미상"}
            </Typography>

            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" color="text.secondary">
                <strong>관리번호: </strong>
                {item.atcId ? (
                  <Link
                    component="a"
                    href={`https://www.lost112.go.kr/find/findDetail.do?ATC_ID=${item.atcId}&FD_SN=${item.fdSn}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {`${item.atcId}-${item.fdSn}`}
                  </Link>
                ) : (
                  "정보 없음"
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>습득날짜: </strong>
                {item.fdYmd ? `${item.fdYmd} ${item.fdHor}시경` : "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>습득장소: </strong>
                {item.fdPlace || "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>물품분류: </strong>
                {item.prdtClNm || "정보 없음"}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                <strong>보관장소: </strong>
                {item.depPlace || "정보 없음"}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                <strong>유실물상태: </strong>
                {item.csteSteNm || "정보 없음"}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                <strong>연락처: </strong>
                {item.tel ? (
                  <Link component="a" href={`tel:${item.tel}`} sx={{ textDecoration: "none" }}>
                    {item.tel}
                  </Link>
                ) : (
                  "정보 없음"
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace="pre-wrap">
                {item.uniq || ""}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ItemDetailPage;
