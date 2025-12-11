import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/authSlice";
import userService from "../services/userService";
import tokenManager from "../utils/tokenManager";
import useApi from "./useApi";
import usePushSubscription from "./usePushSubscription";

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
