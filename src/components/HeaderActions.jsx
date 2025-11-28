import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu as MuiMenu,
  MenuItem,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import useApi from "../hooks/useApi";
import useThemeMode from "../hooks/useThemeMode";
import { logoutAction, selectIsAuthenticated } from "../redux/authSlice";
import authService from "../services/authService";

function HeaderActions() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { mode, toggleTheme } = useThemeMode();
  const { execute: logout, loading: logoutLoading } = useApi(authService.logout);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (isAuthenticated) {
      try {
        await logout();
      } catch (err) {
        console.error(err);
      } finally {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        dispatch(logoutAction());
      }
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={1.5}>
      <Tooltip title="테마 변경">
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>

      {isAuthenticated ? (
        <>
          <Tooltip title="알림">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="계정 관리">
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: { xs: 0, md: 1 } }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>

          <MuiMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={RouterLink} to="/mypage">
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              마이페이지
            </MenuItem>
            <Divider />
            <MenuItem disabled={logoutLoading} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              로그아웃
            </MenuItem>
          </MuiMenu>
        </>
      ) : (
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            borderRadius: "50px",
            fontWeight: "bold",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" }
          }}
        >
          로그인
        </Button>
      )}
    </Box>
  );
}

export default HeaderActions;
