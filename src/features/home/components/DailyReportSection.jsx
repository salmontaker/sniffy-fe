import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Card, CardContent, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import statsService from "@/features/stats/api/statsService";
import useApi from "@/hooks/useApi";

function DailyReportSection() {
  const { execute: getTop5Agencies, loading: top5AgenciesLoading } = useApi(statsService.getTop5Agencies);
  const { execute: getTop5Categories, loading: top5CategoriesLoading } = useApi(statsService.getTop5Categories);

  const [top5Agencies, setTop5Agencies] = useState([]);
  const [top5Categories, setTop5Categories] = useState([]);

  useEffect(() => {
    getTop5Agencies()
      .then((res) => setTop5Agencies(res.data))
      .catch((err) => console.error(err));
    getTop5Categories()
      .then((res) => setTop5Categories(res.data))
      .catch((err) => console.error(err));
  }, [getTop5Agencies, getTop5Categories]);

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={2} sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
        <AssignmentIcon color="primary" /> 일일 탐정 리포트
      </Typography>

      <Box display="flex" justifyContent="center" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
        <Card
          elevation={0}
          sx={{ flex: 1, minWidth: 250, border: "1px solid", borderColor: "divider", borderRadius: 4 }}
        >
          <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            <Box
              sx={{
                p: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.04)
                    : alpha(theme.palette.primary.main, 0.08),
                borderBottom: "1px solid",
                borderColor: "divider"
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                바쁜 유실물센터 TOP 5
              </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              {top5AgenciesLoading ? (
                <LoadingSpinner />
              ) : top5Agencies.length === 0 ? (
                <EmptyData message="데이터가 없습니다" />
              ) : (
                <List dense disablePadding>
                  {top5Agencies.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/search?agencyName=${item.name}`}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            transform: "translateX(4px)"
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                          <Typography variant="body2">
                            {index + 1}. {item.name}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Typography variant="body2" color="primary" fontWeight="bold">
                              {item.todayTotal.toLocaleString()}건
                            </Typography>
                            <KeyboardArrowRightIcon
                              sx={{
                                fontSize: 20,
                                color: "primary.light"
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          sx={{ flex: 1, minWidth: 250, border: "1px solid", borderColor: "divider", borderRadius: 4 }}
        >
          <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            <Box
              sx={{
                p: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.04)
                    : alpha(theme.palette.primary.main, 0.08),
                borderBottom: "1px solid",
                borderColor: "divider"
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                많이 잃어버린 품목 TOP 5
              </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              {top5CategoriesLoading ? (
                <LoadingSpinner />
              ) : top5Categories.length === 0 ? (
                <EmptyData message="데이터가 없습니다" />
              ) : (
                <List dense disablePadding>
                  {top5Categories.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/search?prdtClNm=${item.category}`}
                        sx={{
                          borderRadius: 2,
                          mb: 0.5,
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                            transform: "translateX(4px)"
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                          <Typography variant="body2">
                            {index + 1}. {item.category}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Typography variant="body2" color="primary" fontWeight="bold">
                              {item.todayTotal.toLocaleString()}건
                            </Typography>
                            <KeyboardArrowRightIcon
                              sx={{
                                fontSize: 20,
                                color: "primary.light"
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default DailyReportSection;
