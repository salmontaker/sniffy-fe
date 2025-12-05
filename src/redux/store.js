import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import noticeReducer from "./noticeSlice";
import themeReducer from "./themeSlice";

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
