/**
 * Phase 2 — Active load realtime hook (load row + offer row).
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";

export function useActiveLoadRealtime(loadId: string | null) {
  const [load, setLoad] = useState<any | null>(null);

  useEffect(() => {
    if (!loadId) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("loads").select("*").eq("id", loadId).maybeSingle();
      if (!cancelled) setLoad(data);
    })();
    const unsub = subscribeToTable<any>({
      channelName: `load-${loadId}`,
      table: "loads",
      filter: `id=eq.${loadId}`,
      onPayload: (p) => setLoad(p.new ?? p.old ?? null),
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [loadId]);

  return load;
}
