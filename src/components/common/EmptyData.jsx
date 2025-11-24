import { Box, Typography } from "@mui/material";

function EmptyData({ message = "데이터가 없습니다" }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyData;
