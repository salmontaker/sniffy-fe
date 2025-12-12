import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import useApi from "@/hooks/useApi";
import usePushSubscription from "@/hooks/usePushSubscription";
import { setUser } from "@/redux/authSlice";
import userKeywordService from "@/services/userKeywordService";
import userService from "@/services/userService";

function NotificationSettings() {
  const dispatch = useDispatch();
  const { subscribe, unsubscribe, loading: subscriptionLoading, isSubscribed } = usePushSubscription();

  const { execute: updatePreference } = useApi(userService.updatePreference);
  const { execute: getKeywords, loading: getKeywordLoading } = useApi(userKeywordService.getKeywords);
  const { execute: createKeyword } = useApi(userKeywordService.createKeyword);
  const { execute: deleteKeyword } = useApi(userKeywordService.deleteKeyword);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleNotificationChange = async (event, checked) => {
    try {
      if (isSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }

      const response = await updatePreference({ isPushEnabled: checked });
      dispatch(setUser(response.data));
    } catch (err) {
      alert(err);
    }
  };

  const fetchKeywords = useCallback(async () => {
    try {
      const response = await getKeywords();
      setKeywords(response.data);
    } catch (err) {
      alert(err);
    }
  }, [getKeywords]);

  const handleAddKeyword = async () => {
    const keyword = keywordInput.trim();

    if (!keyword) {
      return;
    }
    if (keywords.some((k) => k.keyword === keyword)) {
      alert("이미 등록된 키워드입니다.");
      return;
    }
    if (keywords.length >= 5) {
      alert("최대 5개의 키워드만 등록할 수 있습니다.");
      return;
    }

    try {
      await createKeyword(keyword);
      setKeywordInput("");
      fetchKeywords();
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteKeyword = async (keywordId) => {
    try {
      await deleteKeyword(keywordId);
      fetchKeywords();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        알림 설정
      </Typography>

      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            borderColor: "primary.main"
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={3} display="flex" alignItems="center" gap={1}>
            <NotificationsActiveIcon color="primary" />
            알림 수신 설정
          </Typography>

          <List disablePadding>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary={<Typography variant="body1">푸시 알림</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    사이트 내 알림 정보를 푸시 알림으로 받아볼 수 있어요.
                  </Typography>
                }
              />
              <Switch
                disabled={subscriptionLoading}
                edge="end"
                checked={isSubscribed}
                onChange={handleNotificationChange}
                color="primary"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            borderColor: "primary.main"
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2} display="flex" alignItems="center" gap={1}>
            <SearchIcon color="primary" />
            키워드 알림 설정
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            관심있는 물품의 키워드를 등록하면, 매일 9시에 알림을 보내드려요.
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddKeyword();
            }}
            sx={{ display: "flex", gap: 2, mb: 3 }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="예: 에어팟, 검정지갑"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!keywordInput.trim()}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }
              }}
            >
              추가
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle2" mb={2} color="text.secondary">
              등록된 키워드 ({keywords.length} / 5)
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} minHeight={40}>
              {getKeywordLoading ? (
                <LoadingSpinner />
              ) : keywords.length > 0 ? (
                keywords.map((keyword) => (
                  <Chip
                    key={keyword.id}
                    label={keyword.keyword}
                    onDelete={() => handleDeleteKeyword(keyword.id)}
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      height: 32,
                      "& .MuiChip-label": {
                        px: 1.5,
                        py: 0.5
                      },
                      "& .MuiChip-deleteIcon": {
                        color: "primary.main",
                        "&:hover": {
                          color: "primary.dark"
                        }
                      }
                    }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  등록된 키워드가 없습니다.
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotificationSettings;
