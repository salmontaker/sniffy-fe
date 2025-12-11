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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import useApi from "../hooks/useApi";
import usePushSubscription from "../hooks/usePushSubscription";
import useThemeMode from "../hooks/useThemeMode";
import { selectIsAuthenticated } from "../redux/authSlice";
import { selectNoticeCount, setNoticeCount } from "../redux/noticeSlice";
import authService from "../services/authService";
import noticeService from "../services/noticeService";
import tokenManager from "../utils/tokenManager";

function HeaderActions() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const noticeCount = useSelector(selectNoticeCount);

  const { mode, toggleTheme } = useThemeMode();
  const { execute: logout, loading: logoutLoading } = useApi(authService.logout);
  const { execute: getNotices } = useApi(noticeService.getNotices);
  const { unsubscribe, loading: subscriptionLoading, isSubscribed } = usePushSubscription();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = async () => {
    if (!isAuthenticated) {
      return;
    }

    if (isSubscribed) {
      try {
        await unsubscribe();
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await logout();
    } finally {
      tokenManager.logout();
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      if (isAuthenticated) {
        try {
          const response = await getNotices();
          dispatch(setNoticeCount(response.data.totalElements));
        } catch (err) {
          alert(err);
        }
      }
    };

    fetchNotices();
  }, [isAuthenticated, getNotices, dispatch]);

  return (
    <>
      {/* 모바일 레이아웃 */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <List disablePadding>
          <ListItemButton onClick={toggleTheme}>
            <ListItemIcon>{mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}</ListItemIcon>
            <ListItemText primary={mode === "dark" ? "라이트 모드로 변경" : "다크 모드로 변경"} />
          </ListItemButton>

          {isAuthenticated ? (
            <>
              <ListItemButton component={RouterLink} to="/notices">
                <ListItemIcon>
                  <Badge badgeContent={noticeCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="알림" />
              </ListItemButton>

              <ListItemButton component={RouterLink} to="/mypage">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="마이페이지" />
              </ListItemButton>

              <ListItemButton onClick={handleLogout} disabled={subscriptionLoading || logoutLoading}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="로그아웃" primaryTypographyProps={{ color: "error" }} />
              </ListItemButton>
            </>
          ) : (
            <ListItem sx={{ pt: 2 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                fullWidth
                size="large"
                startIcon={<PersonIcon />}
              >
                로그인
              </Button>
            </ListItem>
          )}
        </List>
      </Box>

      {/* 데스크탑 레이아웃 */}
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
        <Tooltip title="테마 변경">
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>

        {isAuthenticated ? (
          <>
            <Tooltip title="알림">
              <IconButton color="inherit" component={RouterLink} to="/notices">
                <Badge badgeContent={noticeCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="계정 관리">
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={menuAnchor}
              open={menuOpen}
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

              <MenuItem disabled={subscriptionLoading || logoutLoading} onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Menu>
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
    </>
  );
}

export default HeaderActions;
