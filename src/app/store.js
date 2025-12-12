import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/slices/authSlice";
import noticeReducer from "@/features/notice/slices/noticeSlice";
import themeReducer from "@/features/theme/slices/themeSlice";

const savedMode = localStorage.getItem("theme");
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notice: noticeReducer
  },
  preloadedState: {
    theme: { mode: savedMode || (prefersDarkMode ? "dark" : "light") }
  }
});
