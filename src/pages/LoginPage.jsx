import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Alert, Box, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import AuthFormContainer from "../components/auth/AuthFormContainer";
import AuthFormHeader from "../components/auth/AuthFormHeader";
import useApi from "../hooks/useApi";
import { loginAction, selectIsAuthenticated } from "../redux/authSlice";
import authService from "../services/authService";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [form, setForm] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { execute: login, loading, error } = useApi(authService.login);
  const [rememberMe, setRememberMe] = useState(false);

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

    if (!form.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
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

    const { email, password } = form;
    const result = await login({ email, password });
    if (result) {
      const data = result.data;

      if (rememberMe) {
        localStorage.setItem("accessToken", data.token);
      } else {
        sessionStorage.setItem("accessToken", data.token);
      }

      dispatch(loginAction(data.user));
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
          {error && (
            <Alert severity="error" icon={<WarningAmberIcon fontSize="inherit" />} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

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
              id="email"
              name="email"
              type="email"
              label="이메일 주소"
              autoComplete="email"
              required
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
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

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="remember-me"
                    name="remember-me"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    로그인 상태 유지
                  </Typography>
                }
              />

              <Link component={RouterLink} to="#" variant="body2" color="primary" underline="hover">
                비밀번호를 잊으셨나요?
              </Link>
            </Box>

            <Button type="submit" disabled={loading} fullWidth variant="contained" color="primary" sx={{ py: 1.5 }}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </AuthFormContainer>
  );
}

export default LoginPage;
