import { useEffect, useState } from "react";

import pushService from "../services/pushService";
import urlBase64ToUint8Array from "../utils/urlBase64ToUint8Array";
import useApi from "./useApi";

const usePushSubscription = () => {
  const { execute: subscribe } = useApi(pushService.subscribe);
  const { execute: unsubscribe } = useApi(pushService.unsubscribe);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [unsubscribeLoading, setUnsubscribeLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const doSubscribe = async () => {
    setSubscribeLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_KEY)
      });

      try {
        await subscribe(sub);
        setIsSubscribed(true);
      } catch (err) {
        await sub.unsubscribe();
        setIsSubscribed(false);
        throw err;
      }
    } catch (err) {
      const permission = Notification.permission;
      if (permission === "denied") {
        throw Error("알림 권한을 허용해주세요.");
      }
      throw err;
    } finally {
      setSubscribeLoading(false);
    }
  };

  const doUnsubscribe = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();

    if (!sub) {
      setIsSubscribed(false);
      return;
    }

    try {
      setUnsubscribeLoading(true);
      await unsubscribe(sub.endpoint);
    } finally {
      await sub.unsubscribe();
      setIsSubscribed(false);
      setUnsubscribeLoading(false);
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();

      setIsSubscribed(!!sub);
    };
    checkSubscription();
  }, []);

  return { doSubscribe, doUnsubscribe, subscribeLoading, unsubscribeLoading, isSubscribed };
};

export default usePushSubscription;
