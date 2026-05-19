/**
 * Phase 5 — In-vehicle session hook (web sim aware).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { createInVehicleAdapter } from "../registry";
import type {
  InVehicleListenerStatus,
  InVehicleSurfaceId,
  RoutingInfoSnapshot,
} from "../types";
import { WebSimAdapter, type WebSimEventListener } from "../adapters/WebSimAdapter";

interface Options {
  driverId: string;
  companyId: string;
  surface?: InVehicleSurfaceId;
}

export function useInVehicleSession(opts: Options) {
  const surface = opts.surface ?? "web_sim";
  const adapter = useMemo(
    () => createInVehicleAdapter(surface, { driverId: opts.driverId, companyId: opts.companyId }),
    [surface, opts.driverId, opts.companyId],
  );
  const [status, setStatus] = useState<InVehicleListenerStatus>("disconnected");
  const [routing, setRouting] = useState<RoutingInfoSnapshot | null>(null);
  const [alert, setAlert] = useState<{ label: string; severity: "info" | "warning" | "critical" } | null>(null);
  const adapterRef = useRef(adapter);
  adapterRef.current = adapter;

  useEffect(() => {
    const unsub = adapter.onStatusChange(setStatus);
    let unsubEvent: (() => void) | null = null;
    if (adapter instanceof WebSimAdapter) {
      const listener: WebSimEventListener = (evt) => {
        if (evt.kind === "routing") setRouting(evt.info);
        if (evt.kind === "alert")   setAlert(evt.alert);
      };
      unsubEvent = adapter.onEvent(listener);
    }
    return () => {
      unsub();
      unsubEvent?.();
      void adapter.disconnect();
    };
  }, [adapter]);

  return {
    surface,
    status,
    routing,
    alert,
    connect: () => adapter.connect(),
    disconnect: () => adapter.disconnect(),
    pushRouting: (info: RoutingInfoSnapshot) => adapter.updateRoutingInfo(info),
    pushAlert: (a: { label: string; severity: "info" | "warning" | "critical" }) => adapter.showAlert(a),
  };
}
