import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Routes } from "react-router-dom";

import Layout from "../components/Layout";
import useApi from "../hooks/useApi";
import useThemeMode from "../hooks/useThemeMode";
import { setUser } from "../redux/authSlice";
import authService from "../services/authService";
import userService from "../services/userService";
import tokenManager from "../utils/tokenManager";
import { appRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();
  const { execute: refresh } = useApi(authService.refresh);
  const { execute: getCurrentUser } = useApi(userService.getCurrentUser);
  const { mode } = useThemeMode();

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#FF8A00",
          light: "#FFE7C2",
          dark: "#FF7000"
        }
      }
    });
  }, [mode]);

  useEffect(() => {
    const init = async () => {
      if (!tokenManager.isRefreshRequired()) {
        return;
      }

      try {
        const refreshRes = await refresh();
        tokenManager.setToken(refreshRes.data.accessToken);

        const userRes = await getCurrentUser();
        dispatch(setUser(userRes.data));
      } catch (err) {
        tokenManager.logout();
        console.error(err);
      }
    };

    init();
  }, [dispatch, refresh, getCurrentUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>{appRoutes()}</Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
