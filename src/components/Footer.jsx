import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider"
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Sniffy. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          본 서비스의 습득물 정보는 경찰청 LOST112 공개 API를 통해 제공됩니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
