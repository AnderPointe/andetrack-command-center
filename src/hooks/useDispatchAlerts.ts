/**
 * Phase 2 — Subscribe to alerts for a company, with mock fallback for preview.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToTable } from "@/lib/realtime";
import type { DispatchAlert } from "@/types/realtime";
import { mockDispatchAlerts } from "@/data/mockRealtimeEvents";

export function useDispatchAlerts(companyId: string | null) {
  const [alerts, setAlerts] = useState<DispatchAlert[]>([]);

  useEffect(() => {
    if (!companyId) {
      setAlerts(mockDispatchAlerts);
      return;
    }
    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from("alerts")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (!cancelled) {
        const rows = (data ?? []) as any[];
        setAlerts(rows.length ? (rows as DispatchAlert[]) : mockDispatchAlerts);
      }
    })();

    const unsub = subscribeToTable<any>({
      channelName: `alerts-${companyId}`,
      table: "alerts",
      filter: `company_id=eq.${companyId}`,
      onPayload: (p) => {
        const row = (p.new ?? p.old) as DispatchAlert | undefined;
        if (!row) return;
        setAlerts((prev) => {
          const filtered = prev.filter((a) => a.id !== row.id);
          return [row, ...filtered].slice(0, 50);
        });
      },
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [companyId]);

  return alerts;
}
