import { Box, Card, CardContent, Grid } from "@mui/material";
import { useState } from "react";

import FavoriteAgencies from "../components/mypage/FavoriteAgencies";
import MyPageSidebar, { TAB_FAVORITES, TAB_NOTIFICATIONS, TAB_PROFILE } from "../components/mypage/MyPageSidebar";
import NotificationSettings from "../components/mypage/NotificationSettings";
import ProfileSettings from "../components/mypage/ProfileSettings";

function MyPage() {
  const [activeTab, setActiveTab] = useState(TAB_PROFILE);

  return (
    <Box py={4}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </Grid>

        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", minHeight: 650 }}>
            <CardContent sx={{ p: 4 }}>
              {activeTab === TAB_PROFILE && <ProfileSettings />}
              {activeTab === TAB_NOTIFICATIONS && <NotificationSettings />}
              {activeTab === TAB_FAVORITES && <FavoriteAgencies />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyPage;
