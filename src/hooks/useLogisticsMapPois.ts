import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LogisticsPoi } from "@/types/map";

// Mock fallback when the `logistics_map_pois` table is not provisioned yet.
const MOCK_POIS: LogisticsPoi[] = [
  { id: "wh-dal", category: "warehouse", name: "Dallas DC", latitude: 32.7767, longitude: -96.797 },
  { id: "wh-atl", category: "warehouse", name: "Atlanta DC", latitude: 33.749, longitude: -84.388 },
  { id: "dep-chi", category: "depot", name: "Chicago Depot", latitude: 41.8781, longitude: -87.6298 },
  { id: "dep-la", category: "depot", name: "LA Depot", latitude: 34.0522, longitude: -118.2437 },
  { id: "cust-nyc", category: "customer", name: "NYC Customer Hub", latitude: 40.7128, longitude: -74.006 },
  { id: "ts-okc", category: "truck_stop", name: "OKC Truck Stop", latitude: 35.4676, longitude: -97.5164 },
  { id: "ap-den", category: "airport", name: "Denver Intl (DEN)", latitude: 39.8561, longitude: -104.6737 },
  { id: "ap-ord", category: "airport", name: "Chicago O'Hare (ORD)", latitude: 41.9742, longitude: -87.9073 },
  { id: "fu-kc", category: "fuel", name: "Kansas City Fuel", latitude: 39.0997, longitude: -94.5786 },
  { id: "rail-mem", category: "rail_yard", name: "Memphis Rail Yard", latitude: 35.1495, longitude: -90.049 },
  { id: "port-lb", category: "port", name: "Port of Long Beach", latitude: 33.7542, longitude: -118.2165 },
  { id: "lp-sea", category: "load_pickup", name: "Seattle Pickup", latitude: 47.6062, longitude: -122.3321 },
  { id: "ld-mia", category: "load_dropoff", name: "Miami Dropoff", latitude: 25.7617, longitude: -80.1918 },
  { id: "mt-pho", category: "maintenance", name: "Phoenix Maintenance", latitude: 33.4484, longitude: -112.074 },
  { id: "st-stl", category: "store", name: "St. Louis Store", latitude: 38.627, longitude: -90.1994 },
  { id: "lm-mtr", category: "landmark", name: "Mt. Rushmore", latitude: 43.8791, longitude: -103.4591 },
  { id: "wt-lkmi", category: "water", name: "Lake Michigan", latitude: 43.5, longitude: -87.0 },
];

export function useLogisticsMapPois() {
  const [pois, setPois] = useState<LogisticsPoi[]>(MOCK_POIS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("logistics_map_pois")
          .select("*");
        if (cancelled || error || !data?.length) return;
        setPois(data as LogisticsPoi[]);
      } catch {
        /* keep mock fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return pois;
}
