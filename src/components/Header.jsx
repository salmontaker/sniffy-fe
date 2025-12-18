import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, ClickAwayListener, Collapse, Container, IconButton, Toolbar } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

import HeaderActions from "@/components/HeaderActions";
import SearchForm from "@/components/SearchForm";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
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
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: { xs: 1, md: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center", width: { xs: "auto", md: 140, lg: 200 } }}>
              <Link to="/">
                <Box component="img" src="/favicon.svg" sx={{ width: 40, height: 40, display: "block" }} />
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                mx: { xs: 0.5, sm: 2, lg: 4 },
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
              <HeaderActions onAction={() => setIsMenuOpen(false)} />
            </Box>
          </Collapse>
        </Container>
      </AppBar>
    </ClickAwayListener>
  );
}

export default Header;
