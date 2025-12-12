import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, Box, Button, Card, CardContent, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { selectAuthUser } from "@/features/auth/slices/authSlice";
import userService from "@/features/mypage/api/userService";
import useApi from "@/hooks/useApi";
import tokenManager from "@/utils/tokenManager";

export const TAB_PROFILE = "profile";
export const TAB_NOTIFICATIONS = "notifications";
export const TAB_FAVORITES = "favorites";

function MyPageSidebar({ activeTab, onTabChange }) {
  const user = useSelector(selectAuthUser);
  const { execute: deleteUser, loading: deleteLoading } = useApi(userService.deleteUser);

  const handleTabChange = (event, newValue) => {
    onTabChange(newValue);
  };

  const handleDeleteUser = async () => {
    if (confirm("정말로 탈퇴하실 건가요?")) {
      try {
        await deleteUser(user.id);
        tokenManager.logout();
        alert("회원탈퇴가 완료되었습니다.");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", height: "100%" }}>
      <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              bgcolor: "primary.light",
              color: "primary.main",
              fontSize: "2rem"
            }}
          >
            {user?.nickname?.charAt(0) || <PersonIcon />}
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            {user?.nickname || "사용자"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.username || "아이디"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                alignItems: "flex-start",
                textAlign: "left",
                minHeight: 48,
                pl: 2,
                justifyContent: "flex-start"
              },
              "& .Mui-selected": {
                fontWeight: "bold",
                color: "primary.main"
              },
              "& .MuiTabs-indicator": {
                left: 0,
                width: "2px"
              }
            }}
          >
            <Tab label="회원정보 수정" value={TAB_PROFILE} icon={<PersonIcon sx={{ mr: 1 }} />} iconPosition="start" />
            <Tab
              label="알림 설정"
              value={TAB_NOTIFICATIONS}
              icon={<NotificationsActiveIcon sx={{ mr: 1 }} />}
              iconPosition="start"
            />
            <Tab
              label="즐겨찾기한 센터"
              value={TAB_FAVORITES}
              icon={<StarIcon sx={{ mr: 1 }} />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          color="error"
          disabled={deleteLoading}
          onClick={handleDeleteUser}
          startIcon={<LogoutIcon />}
          sx={{ justifyContent: "flex-start", px: 2, py: 1, borderRadius: 2 }}
        >
          회원탈퇴
        </Button>
      </CardContent>
    </Card>
  );
}

export default MyPageSidebar;
