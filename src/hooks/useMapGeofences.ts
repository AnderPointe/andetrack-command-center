import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type GeofenceType =
  | "delivery"
  | "customer"
  | "yard"
  | "restricted"
  | "airport"
  | "port"
  | "warehouse";

export interface MapGeofence {
  id: string;
  name: string;
  type: GeofenceType;
  status: "active" | "inactive";
  center: [number, number]; // [lng, lat]
  radius_m: number;
  notes?: string;
}

const DEMO_GEOFENCES: MapGeofence[] = [
  { id: "g-dal-yard", name: "Dallas Yard", type: "yard", status: "active", center: [-96.797, 32.7767], radius_m: 1200, notes: "Primary DFW yard" },
  { id: "g-dfw-air", name: "DFW Airport", type: "airport", status: "active", center: [-97.0403, 32.8998], radius_m: 4500 },
  { id: "g-lb-port", name: "Port of Long Beach", type: "port", status: "active", center: [-118.2165, 33.7542], radius_m: 3500 },
  { id: "g-atl-wh", name: "Atlanta DC Zone", type: "warehouse", status: "active", center: [-84.388, 33.749], radius_m: 1500 },
  { id: "g-chi-rest", name: "Chicago Downtown Restricted", type: "restricted", status: "active", center: [-87.6298, 41.8781], radius_m: 2500, notes: "No truck access 7a–7p" },
  { id: "g-hou-cust", name: "Houston Customer Hub", type: "customer", status: "active", center: [-95.3698, 29.7604], radius_m: 1800 },
];

export function useMapGeofences() {
  const [geofences, setGeofences] = useState<MapGeofence[]>(DEMO_GEOFENCES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await (supabase as any)
          .from("logistics_map_geofences")
          .select("*");
        if (cancelled || error || !data?.length) return;
        setGeofences(data as MapGeofence[]);
      } catch {
        /* keep demo */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { geofences, loading };
}
