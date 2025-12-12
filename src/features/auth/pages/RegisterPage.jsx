import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import AuthFormContainer from "@/features/auth/components/AuthFormContainer";
import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";
import userService from "@/features/mypage/api/userService";
import useApi from "@/hooks/useApi";

function RegisterPage() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { execute: createUser, loading: createUserLoading } = useApi(userService.createUser);

  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: ""
  });

  const [formErrors, setFormErrors] = useState({});

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

    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!form.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (!/^[가-힣a-zA-Z0-9]{2,}$/.test(form.nickname)) {
      newErrors.nickname = "특수문자와 공백을 제외하고, 최소 2자 이상이어야 합니다.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { username, password, nickname } = form;
      await createUser({ username, password, nickname });
      alert("회원가입에 성공했습니다.");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader title="회원가입" subTitle="이미 계정이 있으신가요?" linkText="로그인" linkTo="/login" />

      <Box sx={{ mt: 4, mx: "auto", width: "100%", maxWidth: "md" }}>
        <Paper
          elevation={3}
          sx={{
            py: 4,
            px: { xs: 2, sm: 4 },
            bgcolor: "background.paper"
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              helperText={formErrors.username || "영문과 숫자만 사용 가능하며, 최소 4자 이상이어야 합니다."}
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              autoComplete="new-password"
              required
              fullWidth
              value={form.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password || "비밀번호는 8자 이상이어야 합니다."}
            />

            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="비밀번호 확인"
              autoComplete="new-password"
              required
              fullWidth
              value={form.passwordConfirm}
              onChange={handleChange}
              error={!!formErrors.passwordConfirm}
              helperText={formErrors.passwordConfirm || "비밀번호를 한 번 더 입력해 주세요."}
            />

            <TextField
              id="nickname"
              name="nickname"
              type="text"
              label="닉네임"
              autoComplete="nickname"
              required
              fullWidth
              value={form.nickname}
              onChange={handleChange}
              error={!!formErrors.nickname}
              helperText={formErrors.nickname || "특수문자와 공백을 제외하고, 최소 2자 이상이어야 합니다."}
            />

            <Button
              type="submit"
              disabled={createUserLoading}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mt: 2 }}
            >
              {createUserLoading ? "가입 처리 중..." : "회원가입"}
            </Button>

            <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 3 }}>
              {"회원가입 시, "}
              <Link component={RouterLink} to="#" color="primary" underline="hover">
                이용약관
              </Link>
              {"과 "}
              <Link component={RouterLink} to="#" color="primary" underline="hover">
                개인정보 처리방침
              </Link>
              에 동의하는 것으로 간주됩니다.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </AuthFormContainer>
  );
}

export default RegisterPage;
