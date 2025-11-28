import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Routes } from "react-router-dom";

import Layout from "../components/Layout";
import useApi from "../hooks/useApi";
import useThemeMode from "../hooks/useThemeMode";
import { loginAction } from "../redux/authSlice";
import userService from "../services/userService";
import { appRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();
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
    const verifyToken = async () => {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const result = await getCurrentUser();
        dispatch(loginAction(result.data));
      } catch (err) {
        console.error(err);
      }
    };

    verifyToken();
  }, [dispatch, getCurrentUser]);

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
