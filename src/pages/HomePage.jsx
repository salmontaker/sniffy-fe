import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

import useApi from "../hooks/useApi";
import foundItemService from "../services/foundItemService";
import statsService from "../services/statsService";

function HomePage() {
  const { execute: getFoundItemTotals } = useApi(statsService.getFoundItemTotals);
  const { execute: getSampleItems } = useApi(foundItemService.getSampleItems);
  const { execute: getTop5Agencies } = useApi(statsService.getTop5Agencies);
  const { execute: getTop5Categories } = useApi(statsService.getTop5Categories);

  const [foundItemTotals, setFoundItemTotals] = useState(null);
  const [sampleItems, setSampleItems] = useState([]);
  const [top5Agencies, setTop5Agencies] = useState([]);
  const [top5Categories, setTop5Categories] = useState([]);

  useEffect(() => {
    getFoundItemTotals().then((res) => {
      setFoundItemTotals({ ...res.data });
    });

    getSampleItems().then((res) => {
      setSampleItems(res.data);
    });

    getTop5Agencies().then((res) => {
      setTop5Agencies(res.data);
    });

    getTop5Categories().then((res) => {
      setTop5Categories(res.data);
    });
  }, [getFoundItemTotals, getSampleItems, getTop5Agencies, getTop5Categories]);

  return (
    <>
      <Box textAlign="center" mb={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Box component="img" src="/logo.png" sx={{ width: 80, height: 80 }} />
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          강아지 탐정이 잃어버린 물건을 찾아드려요!
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        gap={1}
        sx={{ flexDirection: { xs: "row" } }}
      >
        <TextField
          placeholder="스니피에게 물어보세요 (예: 지갑, 핸드폰)"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2
          }}
        />
        <Button
          variant="contained"
          size="medium"
          endIcon={<PetsIcon />}
          sx={{
            px: 3,
            py: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
            flexShrink: 0
          }}
        >
          <Typography variant="body1">찾아줘!</Typography>
        </Button>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          🐾 내 물건, 지도에서 찾기
        </Typography>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
            overflow: "hidden"
          }}
        >
          <CardContent>
            <Typography variant="body1" color="text.secondary" mb={2}>
              잃어버린 장소나 주소를 입력해보세요. 근처 유실물센터를 <strong>지도</strong> 위에 표시해드릴게요!
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <TextField
                placeholder="예: 서울역, 강남역, 시청 등"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2
                }}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{
                  px: 2.5,
                  py: 1,
                  whiteSpace: "nowrap",
                  boxShadow: "none"
                }}
              >
                검색
              </Button>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: 320,
                bgcolor: "grey.100",
                border: "2px dashed",
                borderColor: "grey.300",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              <Typography color="text.disabled">지도 컴포넌트</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
              {top5Agencies.length ? (
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
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" py={3}>
                  <CircularProgress size={24} />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    불러오는 중...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                많이 잃어버린 품목 TOP 5
              </Typography>
              <Divider sx={{ my: 1 }} />
              {top5Categories.length ? (
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
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" py={3}>
                  <CircularProgress size={24} />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    불러오는 중...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          🐾 최근 등록된 습득물
        </Typography>

        <Card sx={{ borderRadius: 3, boxShadow: "0 3px 8px rgba(0,0,0,0.06)" }}>
          <CardContent>
            {!sampleItems.length ? (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={24} />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  불러오는 중...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {sampleItems.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
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
                          backgroundImage: `url(${item.fdFilePathImg})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      />

                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.primary" noWrap fontWeight={600}>
                          {item.fdPrdtNm}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          📁 카테고리: {item.prdtClNm}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          🗓 습득일: {item.fdYmd}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          🏛 보관장소: {item.agencyName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          🐾 습득물 등록 현황
        </Typography>
        <Card>
          <CardContent>
            {!foundItemTotals ? (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={24} />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  불러오는 중...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    오늘 등록
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {foundItemTotals.todayTotal.toLocaleString()}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    이번 주 등록
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {foundItemTotals.weekTotal.toLocaleString()}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    이번 달 등록
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {foundItemTotals.monthTotal.toLocaleString()}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    최종 업데이트
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {new Date(foundItemTotals.lastUpdated).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default HomePage;
