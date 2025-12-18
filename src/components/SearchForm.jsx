import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search${query && `?fdPrdtNm=${query.trim()}`}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 600 }}>
      <Paper
        elevation={0}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "50px",
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          border: "1px solid",
          borderColor: "transparent",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            borderColor: "rgba(0,0,0,0.1)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          },
          "&:focus-within": {
            bgcolor: "background.paper",
            borderColor: "primary.main",
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
          }
        }}
      >
        <Box sx={{ p: 1, pl: 2, display: { xs: "none", sm: "flex" }, color: "text.secondary" }}>
          <SearchIcon />
        </Box>

        <InputBase
          sx={{
            ml: { xs: 2.5, sm: 1 },
            flex: 1,
            "& input": {
              fontWeight: 500,
              "&::placeholder": {
                opacity: 0.7
              }
            }
          }}
          placeholder="분실물 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "50px",
            minWidth: { xs: "auto", sm: 80 },
            px: { xs: 1.5, sm: 3 },
            py: 0.8,
            m: 0.5,
            fontSize: { xs: "0.85rem", sm: "1rem" },
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
            }
          }}
        >
          검색
        </Button>
      </Paper>
    </Box>
  );
}

export default SearchForm;
