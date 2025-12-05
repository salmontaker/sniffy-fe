import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNoticeCount(state, action) {
      state.count = action.payload;
    },
    clearNoticeCount(state) {
      state.count = 0;
    }
  }
});

export const { setNoticeCount, clearNoticeCount } = noticeSlice.actions;
export const selectNoticeCount = (state) => state.notice.count;

export default noticeSlice.reducer;
