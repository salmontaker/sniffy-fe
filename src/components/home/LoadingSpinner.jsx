import { Box, CircularProgress, Typography } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <CircularProgress size={24} />
      <Typography variant="body2" color="text.secondary" ml={1}>
        불러오는 중...
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;
