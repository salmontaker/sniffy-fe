import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { HttpStatusCode } from "axios";
import { useEffect, useMemo } from "react";
import { Routes } from "react-router-dom";

import { appRoutes } from "@/app/routes";
import Layout from "@/components/Layout";
import useInitializeAuth from "@/features/auth/hooks/useInitializeAuth";
import useThemeMode from "@/features/theme/hooks/useThemeMode";
import { createAppTheme } from "@/styles/theme";

function App() {
  const { handleInitializeAuth } = useInitializeAuth();
  const { mode } = useThemeMode();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    const init = async () => {
      try {
        await handleInitializeAuth();
      } catch (err) {
        if (err.status !== HttpStatusCode.Unauthorized) {
          console.error(err);
        }
      }
    };

    init();
  }, [handleInitializeAuth]);

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
