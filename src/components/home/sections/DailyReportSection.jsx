import { Box, Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import useApi from "../../../hooks/useApi";
import statsService from "../../../services/statsService";
import EmptyData from "../EmptyData";
import LoadingSpinner from "../LoadingSpinner";

function DailyReportSection() {
  const { execute: getTop5Agencies, loading: top5AgenciesLoading } = useApi(statsService.getTop5Agencies);
  const { execute: getTop5Categories, loading: top5CategoriesLoading } = useApi(statsService.getTop5Categories);

  const [top5Agencies, setTop5Agencies] = useState([]);
  const [top5Categories, setTop5Categories] = useState([]);

  useEffect(() => {
    getTop5Agencies().then((res) => {
      setTop5Agencies(res.data);
    });

    getTop5Categories().then((res) => {
      setTop5Categories(res.data);
    });
  }, [getTop5Agencies, getTop5Categories]);

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={2}>
        🐾 일일 탐정 리포트
      </Typography>

      <Box display="flex" justifyContent="center" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              바쁜 유실물센터 TOP 5
            </Typography>
            <Divider sx={{ my: 1 }} />
            {top5AgenciesLoading ? (
              <LoadingSpinner />
            ) : top5Agencies.length === 0 ? (
              <EmptyData message="유실물센터 데이터가 없습니다" />
            ) : (
              <List dense>
                {top5Agencies.map((data, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={`${index + 1}. ${data.name}`}
                      slotProps={{ primary: { variant: "body2" } }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {data.todayTotal.toLocaleString()}건
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              많이 잃어버린 품목 TOP 5
            </Typography>
            <Divider sx={{ my: 1 }} />
            {top5CategoriesLoading ? (
              <LoadingSpinner />
            ) : top5Categories.length === 0 ? (
              <EmptyData message="품목 데이터가 없습니다" />
            ) : (
              <List dense>
                {top5Categories.map((data, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={`${index + 1}. ${data.category}`}
                      slotProps={{ primary: { variant: "body2" } }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {data.todayTotal.toLocaleString()}건
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default DailyReportSection;
