import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsSubscribed, setSubscriptionStatus } from "@/features/auth/slices/authSlice";
import pushService from "@/features/push/api/pushService";
import useApi from "@/hooks/useApi";
import urlBase64ToUint8Array from "@/utils/urlBase64ToUint8Array";

const usePushSubscription = () => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector(selectIsSubscribed);

  const { execute: subscribeApi } = useApi(pushService.subscribe);
  const { execute: unsubscribeApi } = useApi(pushService.unsubscribe);
  const { execute: checkSubscription } = useApi(pushService.checkSubscription);

  const [loading, setLoading] = useState(false);

  const getPushManager = async () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("이 브라우저는 서비스 워커를 지원하지 않습니다.");
    }

    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager;
  };

  const subscribe = useCallback(async () => {
    setLoading(true);
    try {
      if (Notification.permission === "denied") {
        throw new Error("알림 권한을 허용해주세요.");
      }

      const pushManager = await getPushManager();
      let sub = await pushManager.getSubscription();

      if (!sub) {
        sub = await pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_KEY)
        });
      }

      await subscribeApi(sub);
      dispatch(setSubscriptionStatus(true));
    } catch (err) {
      dispatch(setSubscriptionStatus(false));
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [subscribeApi, dispatch]);

  const unsubscribe = useCallback(async () => {
    setLoading(true);
    try {
      const pushManager = await getPushManager();
      const sub = await pushManager.getSubscription();

      if (sub) {
        await unsubscribeApi(sub.endpoint);
      }
      dispatch(setSubscriptionStatus(false));
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [unsubscribeApi, dispatch]);

  const syncSubscription = useCallback(
    async (user) => {
      if (!user) {
        return;
      }

      setLoading(true);
      try {
        // 현재 브라우저의 구독 정보 확인
        const pushManager = await getPushManager();
        const sub = await pushManager.getSubscription();
        let isEndpointValid = false;

        if (sub) {
          // 서버에 유효성 검증
          const response = await checkSubscription(sub.endpoint);
          isEndpointValid = response.data;
        }

        // 확인된 상태를 Redux에 먼저 반영 (UI 동기화)
        dispatch(setSubscriptionStatus(isEndpointValid));

        // 서버 설정과 비교
        if (user.isPushEnabled) {
          // 켜져 있어야 하는데 유효하지 않다면 -> 구독 실행
          if (!isEndpointValid) {
            await subscribe();
          }
        } else {
          // 꺼져 있어야 하는데 유효하다면 -> 구독 해지
          if (isEndpointValid) {
            await unsubscribe();
          }
        }
      } catch (error) {
        console.error(error);
        dispatch(setSubscriptionStatus(false));
      } finally {
        setLoading(false);
      }
    },
    [checkSubscription, dispatch, subscribe, unsubscribe]
  );

  return { subscribe, unsubscribe, syncSubscription, loading, isSubscribed };
};

export default usePushSubscription;
