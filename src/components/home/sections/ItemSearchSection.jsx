import PetsIcon from "@mui/icons-material/Pets";
import { Box, Button, TextField, Typography } from "@mui/material";

function ItemSearchSection() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={4} gap={1}>
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
  );
}

export default ItemSearchSection;
