import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { Routes } from "react-router-dom";

import Layout from "../components/Layout";
import useApi from "../hooks/useApi";
import useInitializeAuth from "../hooks/useInitializeAuth";
import useThemeMode from "../hooks/useThemeMode";
import authService from "../services/authService";
import tokenManager from "../utils/tokenManager";
import { appRoutes } from "./routes";

function App() {
  const { execute: refresh } = useApi(authService.refresh);
  const { handleInitializeAuth } = useInitializeAuth();
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
        const response = await refresh();
        const { accessToken } = response.data;

        await handleInitializeAuth(accessToken);
      } catch (err) {
        tokenManager.logout();
        console.error(err);
      }
    };

    init();
  }, [refresh, handleInitializeAuth]);

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
