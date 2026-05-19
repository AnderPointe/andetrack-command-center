/**
 * Phase 4 — useOfflineVoiceQueue.
 *
 * Tracks online/offline state and pending queued voice commands, and
 * auto-flushes when connectivity returns.
 */
import { useEffect, useState, useCallback } from "react";
import { flushQueue, getQueueSize, isOnline } from "../voice/offlineQueue";

export function useOfflineVoiceQueue() {
  const [online, setOnline] = useState<boolean>(isOnline());
  const [pending, setPending] = useState<number>(getQueueSize());

  const refresh = useCallback(() => setPending(getQueueSize()), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOnline = async () => {
      setOnline(true);
      const res = await flushQueue();
      setPending(res.remaining);
    };
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    const t = setInterval(refresh, 4000);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      clearInterval(t);
    };
  }, [refresh]);

  const flushNow = useCallback(async () => {
    const res = await flushQueue();
    setPending(res.remaining);
    return res;
  }, []);

  return { online, pending, flushNow, refresh };
}
