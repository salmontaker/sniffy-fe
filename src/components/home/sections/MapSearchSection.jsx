import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

import KakaoMap from "../KakaoMap";

function MapSearchSection() {
  return (
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
            width="100%"
            height={320}
            bgcolor="grey.100"
            border="2px dashed"
            borderColor="grey.300"
            borderRadius={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <KakaoMap />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MapSearchSection;
