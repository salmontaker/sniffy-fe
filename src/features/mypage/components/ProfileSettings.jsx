import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser, setUser } from "@/features/auth/slices/authSlice";
import userService from "@/features/mypage/api/userService";
import useApi from "@/hooks/useApi";

function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const { execute: updateUser, loading, error } = useApi(userService.updateUser);

  const [form, setForm] = useState({
    nickname: user.nickname || "",
    password: "",
    passwordConfirm: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (!/^[a-zA-Z0-9가-힣]{2,}$/.test(form.nickname)) {
      newErrors.nickname = "영문, 숫자, 한글만 사용 가능하며, 최소 2자 이상이어야 합니다.";
    }

    if (form.password && form.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // 값이 있는 항목만 필터링
    const validData = Object.fromEntries(Object.entries(form).filter(([_, value]) => !!value));

    try {
      const response = await updateUser(validData);
      const user = response.data;

      alert("회원정보가 수정되었습니다.");
      dispatch(setUser(user));
      setForm({ nickname: user.nickname || "", password: "", passwordConfirm: "" });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleProfileUpdate}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        회원정보 수정
      </Typography>

      {error && (
        <Alert severity="error" icon={<WarningAmberIcon fontSize="inherit" />} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        <TextField
          label="닉네임"
          name="nickname"
          value={form.nickname}
          onChange={handleProfileChange}
          fullWidth
          variant="outlined"
          error={!!formErrors.nickname}
          helperText={formErrors.nickname || "영문, 숫자, 한글만 사용 가능하며, 최소 2자 이상이어야 합니다."}
        />
        <TextField
          type="password"
          label="새 비밀번호"
          name="password"
          value={form.password}
          onChange={handleProfileChange}
          fullWidth
          error={!!formErrors.password}
          helperText={formErrors.password || "비밀번호는 최소 8자 이상이어야 합니다."}
        />
        <TextField
          type="password"
          label="비밀번호 재입력"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleProfileChange}
          fullWidth
          error={!!formErrors.passwordConfirm}
          helperText={formErrors.passwordConfirm || "비밀번호를 다시 입력해주세요."}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" disabled={loading}>
            수정하기
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileSettings;
