import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import useApi from "../hooks/useApi";
import useThemeMode from "../hooks/useThemeMode";
import { logoutAction, selectIsAuthenticated } from "../redux/authSlice";
import authService from "../services/authService";

function Menu() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { mode, toggleTheme } = useThemeMode();
  const { execute: logout } = useApi(authService.logout);

  const handleLogout = async () => {
    if (isAuthenticated) {
      await logout();

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      dispatch(logoutAction());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 1
      }}
    >
      <IconButton
        onClick={() => toggleTheme()}
        color="inherit"
        sx={{
          width: { xs: "100%", md: "auto" },
          borderRadius: 2,
          "&:hover": {
            bgcolor: "action.hover"
          }
        }}
      >
        {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>

      <Button
        component={RouterLink}
        to={isAuthenticated ? "#" : "/login"}
        onClick={isAuthenticated ? handleLogout : undefined}
        color="inherit"
        variant="text"
        sx={{
          width: { xs: "100%", md: "auto" },
          borderRadius: 2,
          "&:hover": {
            bgcolor: "action.hover"
          }
        }}
      >
        {isAuthenticated ? "로그아웃" : "로그인"}
      </Button>
    </Box>
  );
}

export default Menu;
