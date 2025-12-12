import { useCallback } from "react";
import { useDispatch } from "react-redux";

import useApi from "@/hooks/useApi";
import usePushSubscription from "@/hooks/usePushSubscription";
import { setUser } from "@/redux/authSlice";
import userService from "@/services/userService";
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
