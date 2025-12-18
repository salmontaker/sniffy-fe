import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { Routes } from "react-router-dom";

import { appRoutes } from "@/app/routes";
import Layout from "@/components/Layout";
import authService from "@/features/auth/api/authService";
import useInitializeAuth from "@/features/auth/hooks/useInitializeAuth";
import useThemeMode from "@/features/theme/hooks/useThemeMode";
import useApi from "@/hooks/useApi";
import { createAppTheme } from "@/styles/theme";
import tokenManager from "@/utils/tokenManager";

function App() {
  const { execute: refresh } = useApi(authService.refresh);
  const { handleInitializeAuth } = useInitializeAuth();
  const { mode } = useThemeMode();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

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
