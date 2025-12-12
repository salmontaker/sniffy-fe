import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import statsService from "@/features/stats/api/statsService";
import useApi from "@/hooks/useApi";

function StatsSummarySection() {
  const { execute: getFoundItemTotals, loading: foundItemTotalsLoading } = useApi(statsService.getFoundItemTotals);
  const [foundItemTotals, setFoundItemTotals] = useState(null);

  useEffect(() => {
    getFoundItemTotals()
      .then((res) => setFoundItemTotals({ ...res.data }))
      .catch((err) => console.error(err));
  }, [getFoundItemTotals]);

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={2}>
        🐾 습득물 등록 현황
      </Typography>
      <Card>
        <CardContent>
          {foundItemTotalsLoading ? (
            <LoadingSpinner />
          ) : !foundItemTotals ? (
            <EmptyData message="등록 현황 데이터가 없습니다" />
          ) : (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  오늘 등록
                </Typography>
                <Typography variant="h5" color="primary">
                  {foundItemTotals?.todayTotal.toLocaleString()}건
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  이번 주 등록
                </Typography>
                <Typography variant="h5" color="primary">
                  {foundItemTotals?.weekTotal.toLocaleString()}건
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  이번 달 등록
                </Typography>
                <Typography variant="h5" color="primary">
                  {foundItemTotals?.monthTotal.toLocaleString()}건
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  최종 업데이트
                </Typography>
                <Typography variant="h6" color="primary">
                  {new Date(foundItemTotals?.lastUpdated).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default StatsSummarySection;
