import { Box, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" mb={4} gap={2}>
      <Box component="img" src="/logo.png" width={80} height={80} />
      <Typography variant="h6" color="text.secondary">
        강아지 탐정이 잃어버린 물건을 찾아드려요!
      </Typography>
    </Box>
  );
}

export default HeroSection;
