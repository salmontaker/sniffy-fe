import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/features/auth/slices/authSlice";
import userService from "@/features/mypage/api/userService";
import usePushSubscription from "@/features/push/hooks/usePushSubscription";
import useApi from "@/hooks/useApi";
import tokenManager from "@/utils/tokenManager";

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const { execute: getCurrentUser } = useApi(userService.getCurrentUser);
  const { syncSubscription } = usePushSubscription();

  const handleInitializeAuth = useCallback(
    async (accessToken) => {
      if (accessToken) {
        tokenManager.setToken(accessToken);
      }

      const response = await getCurrentUser();
      const user = response.data;

      dispatch(setUser(user));

      await syncSubscription(user);
    },
    [dispatch, getCurrentUser, syncSubscription]
  );

  return { handleInitializeAuth };
};

export default useInitializeAuth;
