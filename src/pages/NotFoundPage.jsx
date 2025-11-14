import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 2
        }}
      >
        <Typography component="h1" variant="h2" color="primary" sx={{ mb: 2, fontWeight: "bold" }}>
          404
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: "center" }}>
          페이지를 찾을 수 없습니다
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          주소를 다시 확인하거나 홈으로 이동해주세요.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            mt: 2,
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none"
            }
          }}
        >
          홈으로 이동
        </Button>
      </Paper>
    </Container>
  );
}

export default NotFoundPage;
