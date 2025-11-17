import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

function HomePage() {
  const [stats, setStats] = useState(null);
  const [recentItems, setRecentItems] = useState([]);
  const [topCenters, setTopCenters] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    async function mockFetch() {
      try {
        await new Promise((res) => setTimeout(res, 500));

        const data = {
          todayTotal: 1161,
          weekTotal: 20889,
          monthTotal: 304873,
          lastUpdated: "2025-11-17 04:03",
          topCenters: [
            "서울역 유실물센터",
            "강남역 유실물센터",
            "시청 유실물센터",
            "홍대입구 유실물센터",
            "잠실역 유실물센터"
          ],
          topCategories: ["지갑", "휴대폰", "가방", "우산", "카드"],
          items: [
            { id: 1, name: "검정색 지갑", category: "지갑", date: "2025-11-17" },
            { id: 2, name: "하얀 휴대폰", category: "전자기기", date: "2025-11-17" },
            { id: 3, name: "파란 우산", category: "생활용품", date: "2025-11-17" },
            { id: 4, name: "갈색 가방", category: "가방", date: "2025-11-16" },
            { id: 5, name: "신용카드", category: "카드", date: "2025-11-16" },
            { id: 6, name: "에어팟 케이스", category: "전자기기", date: "2025-11-16" }
          ]
        };

        setStats({
          todayTotal: data.todayTotal,
          weekTotal: data.weekTotal,
          monthTotal: data.monthTotal,
          lastUpdated: data.lastUpdated
        });
        setRecentItems(data.items);
        setTopCenters(data.topCenters);
        setTopCategories(data.topCategories);
      } catch (error) {
        console.error(error);
      }
    }

    mockFetch();
  }, []);

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
              {topCenters.length ? (
                <List dense>
                  {topCenters.map((center, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText primary={`${index + 1}. ${center}`} primaryTypographyProps={{ variant: "body2" }} />
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
              {topCategories.length ? (
                <List dense>
                  {topCategories.map((category, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={`${index + 1}. ${category}`}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
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
            {!recentItems.length ? (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={24} />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  불러오는 중...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {recentItems.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        transition: "transform 0.15s ease, box-shadow 0.15s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }
                      }}
                    >
                      <Box
                        sx={{
                          height: 140,
                          bgcolor: "grey.100",
                          backgroundImage: `url(/images/${item.category}.jpg)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {!item.preview && (
                          <Typography variant="body2" color="text.disabled">
                            미리보기 없음
                          </Typography>
                        )}
                      </Box>

                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.primary" noWrap fontWeight={600}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          📁 카테고리: {item.category}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                          🗓 등록일: {item.date}
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
            {!stats ? (
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
                    {stats.todayTotal}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    이번 주 등록
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.weekTotal}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    이번 달 등록
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.monthTotal}건
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    최종 업데이트
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {stats.lastUpdated}
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
