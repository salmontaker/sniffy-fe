import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Collapse, Container, IconButton, Toolbar } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

import HeaderActions from "./HeaderActions";
import SearchForm from "./SearchForm";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider"
      })}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: { xs: 1, md: 2 } }}>
          <Box sx={{ display: "flex", alignItems: "center", width: { xs: "auto", md: 140, lg: 200 } }}>
            <Link to="/">
              <Box component="img" src="/logo.png" sx={{ width: 40, height: 40, display: "block" }} />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              mx: { xs: 2, md: 2, lg: 4 },
              display: "flex",
              justifyContent: "center",
              minWidth: { md: 300, lg: 400 }
            }}
          >
            <SearchForm />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
              width: { md: 140, lg: 200 }
            }}
          >
            <HeaderActions />
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
            <HeaderActions />
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
}

export default Header;
