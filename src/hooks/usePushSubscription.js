import { useEffect, useState } from "react";

import pushService from "../services/pushService";
import urlBase64ToUint8Array from "../utils/urlBase64ToUint8Array";
import useApi from "./useApi";

const usePushSubscription = () => {
  const { execute: subscribe, loading: subscribeLoading } = useApi(pushService.subscribe);
  const { execute: unsubscribe, loading: unsubscribeLoading } = useApi(pushService.unsubscribe);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const doSubscribe = async () => {
    const reg = await navigator.serviceWorker.register("/sw.js");
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_KEY)
    });

    try {
      await subscribe(sub);
      setIsSubscribed(true);
    } catch (err) {
      await sub.unsubscribe();
      throw err;
    }
  };

  const doUnsubscribe = async () => {
    const reg = await navigator.serviceWorker.register("/sw.js");
    const sub = await reg.pushManager.getSubscription();

    if (!sub) {
      return;
    }

    try {
      await unsubscribe(sub.endpoint);
    } finally {
      await sub.unsubscribe();
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const sub = await reg.pushManager.getSubscription();
      setIsSubscribed(!!sub);
    };
    checkSubscription();
  }, []);

  return { doSubscribe, doUnsubscribe, subscribeLoading, unsubscribeLoading, isSubscribed };
};

export default usePushSubscription;
