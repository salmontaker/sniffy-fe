import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Collapse, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
import SearchForm from "./SearchForm";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        bgcolor: "background.paper"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" }
            }}
          >
            Sniffy
          </Typography>

          <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 4, md: 8 } }}>
            <SearchForm />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Menu />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={() => setIsMenuOpen(!isMenuOpen)} color="inherit">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        <Collapse
          in={isMenuOpen}
          timeout="auto"
          unmountOnExit
          id="mobile-menu"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box sx={{ p: 2 }}>
            <Menu />
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
}

export default Header;
