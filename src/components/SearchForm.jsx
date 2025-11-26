import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputBase, Paper } from "@mui/material";
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
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "50px",
          bgcolor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            bgcolor: "action.selected",
            borderColor: "text.secondary"
          },
          "&:focus-within": {
            bgcolor: "background.paper",
            borderColor: "primary.main"
          }
        }}
      >
        <Box sx={{ p: 1, display: "flex", color: "text.secondary" }}>
          <SearchIcon />
        </Box>

        <InputBase
          sx={{ mx: 1, flex: 1 }}
          placeholder="무엇을 잃어버리셨나요?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          type="submit"
          variant="text"
          color="primary"
          sx={{
            borderRadius: "50px",
            fontWeight: "bold"
          }}
        >
          찾기
        </Button>
      </Paper>
    </Box>
  );
}

export default SearchForm;
