export type DriverStatus =
  | "available"
  | "assigned"
  | "loaded"
  | "break"
  | "alert"
  | "offline";

export interface LiveDriver {
  driver_id: string;
  driver_name: string | null;
  unit_number: string | null;
  vehicle_type: string | null;
  status: DriverStatus;
  latitude: number;
  longitude: number;
  heading: number | null;
  speed_mph: number | null;
  eta_minutes: number | null;
  current_load_number: string | null;
  battery_pct: number | null;
  signal: "live" | "stale" | "lost" | null;
  last_ping_at: string;
}

export type PoiCategory =
  | "load_pickup"
  | "load_dropoff"
  | "warehouse"
  | "depot"
  | "customer"
  | "truck_stop"
  | "airport"
  | "rail_yard"
  | "port"
  | "fuel"
  | "maintenance"
  | "store"
  | "landmark"
  | "water"
  | "custom";

export interface LogisticsPoi {
  id: string;
  category: PoiCategory;
  name: string;
  latitude: number;
  longitude: number;
  meta?: Record<string, unknown>;
}

export type LayerKey =
  | "drivers"
  | "loads"
  | "warehouses"
  | "depots"
  | "customers"
  | "truck_stops"
  | "airports"
  | "rail_yards"
  | "ports"
  | "fuel"
  | "maintenance"
  | "stores"
  | "landmarks"
  | "water"
  | "custom";

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteResult {
  geometry: RoutePoint[];
  distanceMeters: number;
  durationSeconds: number;
  provider: "placeholder" | "osrm" | "valhalla" | "graphhopper";
}
