/** Phase 7 — Lightweight hooks for enterprise mock data.
 *  Real wiring would query Supabase via createServerFn. */
import { useState } from "react";
import { MOCK_CATALOG, MOCK_CONNECTED, MOCK_EDI_TX } from "../data/mockEnterprise";
import type { CompanyIntegration } from "../types";

export function useConnectorCatalog() { return { catalog: MOCK_CATALOG }; }

export function useCompanyIntegrations() {
  const [items, setItems] = useState<CompanyIntegration[]>(MOCK_CONNECTED);
  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));
  const sync = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, last_sync_at: new Date().toISOString(), health: "healthy", last_error: null } : i)));
  return { items, toggle, sync };
}

export function useEdiTransactions() { return { transactions: MOCK_EDI_TX }; }
