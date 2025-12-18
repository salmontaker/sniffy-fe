import BarChartIcon from "@mui/icons-material/BarChart";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

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
      <Typography variant="h6" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
        <BarChartIcon color="primary" />
        습득물 등록 현황
      </Typography>
      <Grid container spacing={2}>
        {[
          { label: "오늘 등록", value: foundItemTotals?.todayTotal, color: "primary" },
          { label: "이번 주 등록", value: foundItemTotals?.weekTotal, color: "primary" },
          { label: "이번 달 등록", value: foundItemTotals?.monthTotal, color: "primary" }
        ].map((stat, index) => (
          <Grid size={{ xs: 4 }} key={index}>
            <Card
              elevation={0}
              sx={{
                bgcolor: (theme) => alpha(theme.palette[stat.color].main, 0.04),
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette[stat.color].main, 0.1),
                borderRadius: 3,
                textAlign: "center"
              }}
            >
              <CardContent sx={{ py: { xs: 2 }, px: 1, "&:last-child": { pb: 2 } }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" gutterBottom>
                  {stat.label}
                </Typography>
                {foundItemTotalsLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  <Typography variant="h6" color={stat.color} fontWeight={800}>
                    {stat.value?.toLocaleString() || 0}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1,
              bgcolor: (theme) => (theme.palette.mode === "light" ? "grey.50" : "grey.900"),
              borderRadius: 2
            }}
          >
            <Typography variant="caption" color="text.disabled">
              마지막 업데이트:{" "}
              {foundItemTotals?.lastUpdated ? new Date(foundItemTotals.lastUpdated).toLocaleString() : "-"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatsSummarySection;
