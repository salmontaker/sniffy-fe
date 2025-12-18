import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box, Card, CardContent, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Linkify from "linkify-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import noticeService from "@/features/notice/api/noticeService";
import { setNoticeCount } from "@/features/notice/slices/noticeSlice";
import useApi from "@/hooks/useApi";

function NoticePage() {
  const dispatch = useDispatch();
  const { execute: getNotices, loading: noticesLoading } = useApi(noticeService.getNotices);
  const { execute: deleteNotice, loading: deleteLoading } = useApi(noticeService.deleteNotice);

  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotices = useCallback(async () => {
    try {
      const response = await getNotices(page);
      const { content, totalPages, totalElements } = response.data;

      setNotices(content);
      setTotalPages(totalPages);
      dispatch(setNoticeCount(totalElements));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, getNotices, page]);

  const handleDeleteNotice = async (id) => {
    try {
      await deleteNotice(id);
      if (notices.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchNotices();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <Box py={4}>
      <Typography variant="h5" fontWeight={800} mb={3} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <NotificationsIcon color="primary" /> 알림
      </Typography>

      {noticesLoading ? (
        <LoadingSpinner />
      ) : notices.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight={300}
          textAlign="center"
        >
          <NotificationsNoneIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            새로운 알림이 없습니다
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {notices.map((notice) => (
            <Card
              key={notice.id}
              sx={{
                width: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.common.black, 0.04)}`,
                  borderColor: "primary.main"
                }
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1.5} mb={1}>
                    <Box flex={1} minWidth={0}>
                      <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                        {notice.createdAt}
                      </Typography>
                      <Typography variant="body1" fontWeight={700} noWrap>
                        {notice.title}
                      </Typography>
                    </Box>
                    <IconButton
                      disabled={deleteLoading}
                      size="small"
                      onClick={() => handleDeleteNotice(notice.id)}
                      sx={{
                        flexShrink: 0,
                        color: "text.disabled",
                        p: 0.5,
                        mt: -0.5,
                        mr: -0.5,
                        "&:hover": {
                          color: "error.main",
                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    whiteSpace="pre-wrap"
                    sx={{ wordBreak: "break-all", lineHeight: 1.6 }}
                  >
                    <Linkify>{notice.content}</Linkify>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {totalPages > 0 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange} />
        </Stack>
      )}
    </Box>
  );
}

export default NoticePage;
