import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, IconButton, Pagination, Stack, Typography } from "@mui/material";
import Linkify from "linkify-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../components/common/LoadingSpinner";
import useApi from "../hooks/useApi";
import { setNoticeCount } from "../redux/noticeSlice";
import noticeService from "../services/noticeService";

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
      <Typography variant="h5" fontWeight="bold" mb={3}>
        알림
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
          <Typography variant="h6" color="text.secondary" mb={1}>
            알림이 없습니다
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {notices.map((notice) => (
            <Card
              key={notice.id}
              sx={{
                width: "100%",
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
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                  <Box flex={1}>
                    <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                      {notice.createdAt}
                    </Typography>
                    <Typography variant="body1">{notice.title}</Typography>
                    <Typography variant="body2" color="text.secondary" mt={1} whiteSpace="pre-wrap">
                      <Linkify>{notice.content}</Linkify>
                    </Typography>
                  </Box>

                  <IconButton
                    disabled={deleteLoading}
                    size="small"
                    onClick={() => handleDeleteNotice(notice.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {totalPages > 0 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            sx={{ "& .MuiPaginationItem-root": { fontSize: "0.875rem" } }}
          />
        </Stack>
      )}
    </Box>
  );
}

export default NoticePage;
