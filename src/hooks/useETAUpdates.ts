/**
 * Phase 2 — Subscribe to eta_updates for a company or specific load.
 */
import { useEffect, useState } from "react";
import { subscribeToTable } from "@/lib/realtime";
import { mockETAUpdates } from "@/data/mockRealtimeEvents";
import type { ETAUpdate } from "@/types/realtime";

export function useETAUpdates(companyId: string | null, loadId?: string | null) {
  const [updates, setUpdates] = useState<ETAUpdate[]>(mockETAUpdates);

  useEffect(() => {
    if (!companyId) return;
    const filter = loadId
      ? `load_id=eq.${loadId}`
      : `company_id=eq.${companyId}`;
    return subscribeToTable<any>({
      channelName: `eta-${companyId}-${loadId ?? "all"}`,
      table: "eta_updates",
      event: "INSERT",
      filter,
      onPayload: (p) =>
        setUpdates((prev) => [p.new as ETAUpdate, ...prev].slice(0, 50)),
    });
  }, [companyId, loadId]);

  return updates;
}
