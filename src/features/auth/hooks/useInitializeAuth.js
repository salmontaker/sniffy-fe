import { useCallback } from "react";
import { useDispatch } from "react-redux";

import authService from "@/features/auth/api/authService";
import { setUser } from "@/features/auth/slices/authSlice";
import userService from "@/features/mypage/api/userService";
import usePushSubscription from "@/features/push/hooks/usePushSubscription";
import useApi from "@/hooks/useApi";

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const { execute: authStatus } = useApi(authService.status);
  const { execute: getCurrentUser } = useApi(userService.getCurrentUser);
  const { syncSubscription } = usePushSubscription();

  const handleInitializeAuth = useCallback(async () => {
    // 인증 정보 확인
    try {
      await authStatus();
    } catch {
      return;
    }

    // 사용자 정보 확인
    const response = await getCurrentUser();
    const user = response.data;

    dispatch(setUser(user));

    // 푸시 구독 정보 동기화
    await syncSubscription(user);
  }, [dispatch, authStatus, getCurrentUser, syncSubscription]);

  return { handleInitializeAuth };
};

export default useInitializeAuth;
