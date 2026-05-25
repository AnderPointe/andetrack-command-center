import { useCallback, useEffect, useState } from "react";
import type { DispatchLayerKey } from "@/components/dispatch/AnderouteDispatchMap";

const STORAGE_KEY = "anderoute:map-layers:v1";

export const DEFAULT_LAYERS: DispatchLayerKey[] = [
  "drivers",
  "loads",
  "pickups",
  "dropoffs",
  "depots",
  "warehouses",
  "customers",
  "truck_stops",
  "fuel",
  "airports",
  "stores",
  "landmarks",
  "custom_pins",
  "geofences",
  "buildings_3d",
];

export function useMapLayerPreferences(initial: DispatchLayerKey[] = DEFAULT_LAYERS) {
  const [visible, setVisible] = useState<Set<DispatchLayerKey>>(() => {
    if (typeof window === "undefined") return new Set(initial);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return new Set(JSON.parse(raw) as DispatchLayerKey[]);
    } catch {
      /* noop */
    }
    return new Set(initial);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...visible]));
    } catch {
      /* noop */
    }
  }, [visible]);

  const toggle = useCallback((key: DispatchLayerKey) => {
    setVisible((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const setMany = useCallback((keys: DispatchLayerKey[]) => {
    setVisible(new Set(keys));
  }, []);

  return { visible, toggle, setMany };
}
