import { Box, Button, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthFormContainer from "../components/auth/AuthFormContainer";
import AuthFormHeader from "../components/auth/AuthFormHeader";
import useApi from "../hooks/useApi";
import { selectIsAuthenticated, setUser } from "../redux/authSlice";
import authService from "../services/authService";
import userService from "../services/userService";
import tokenManager from "../utils/tokenManager";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { execute: login, loading: loginLoading } = useApi(authService.login);
  const { execute: getCurrentUser, loading: userLoading } = useApi(userService.getCurrentUser);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.username) {
      newErrors.username = "아이디를 입력해주세요.";
    } else if (!/^[a-zA-Z0-9]{4,}$/.test(form.username)) {
      newErrors.username = "영문과 숫자만 사용 가능하며, 최소 4자 이상이어야 합니다.";
    }

    if (!form.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (form.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { username, password } = form;

    try {
      const loginRes = await login({ username, password });
      tokenManager.setToken(loginRes.data.accessToken);

      const userRes = await getCurrentUser();
      dispatch(setUser(userRes.data));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader title="로그인" subTitle="계정이 없으신가요?" linkText="회원가입" linkTo="/register" />

      <Box sx={{ mt: 4, mx: "auto", width: "100%", maxWidth: "md" }}>
        <Paper
          elevation={3}
          sx={{
            py: 4,
            px: { xs: 2, sm: 4 },
            bgcolor: "background.paper"
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            <TextField
              id="username"
              name="username"
              type="text"
              label="아이디"
              autoComplete="username"
              required
              fullWidth
              value={form.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              autoComplete="current-password"
              required
              fullWidth
              value={form.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

            <Button
              type="submit"
              disabled={loginLoading || userLoading}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5 }}
            >
              {loginLoading || userLoading ? "로그인 중..." : "로그인"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </AuthFormContainer>
  );
}

export default LoginPage;
