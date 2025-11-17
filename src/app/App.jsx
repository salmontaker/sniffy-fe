import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Routes } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import useApi from "../hooks/useApi.jsx";
import useThemeMode from "../hooks/useThemeMode.jsx";
import { loginAction } from "../redux/authSlice.js";
import authService from "../services/authService.js";
import { appRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();
  const { execute: verify } = useApi(authService.verify);
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
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: (themeParam) => ({
            "*": {
              // color나 배경색이 바뀔 때 부드럽게 변하도록 설정
              transition: themeParam.transitions.create(["color", "background-color"], {
                duration: themeParam.transitions.duration.shortest
              })
            }
          })
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

      const result = await verify();
      if (result) {
        dispatch(loginAction(result));
      }
    };

    verifyToken();
  }, [dispatch, verify]);

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
