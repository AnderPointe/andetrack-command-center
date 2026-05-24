import type { DriverLocationRow } from "@/hooks/useLiveDriverLocations";

export type LiveMapDriver = {
  id: string;
  name: string;
  unit: string;
  status: DriverLocationRow["status"];
  vehicleType: string;
  speedMph: number;
  heading: number;
  etaMinutes: number;
  currentLoad?: string;
  position: [number, number];
  lastPingSeconds: number;
  fuelMpg: number;
};

export function mapLocationRowToLiveDriver(row: DriverLocationRow): LiveMapDriver {
  const lastPingMs = new Date(row.last_ping_at).getTime();
  const lastPingSeconds = Math.max(0, Math.round((Date.now() - lastPingMs) / 1000));

  return {
    id: row.driver_id,
    name: "Driver",
    unit: row.unit_number || "Unknown Unit",
    status: lastPingSeconds > 120 ? "offline" : row.status,
    vehicleType: row.vehicle_type || "Vehicle",
    speedMph: Number(row.speed_mph || 0),
    heading: Number(row.heading || 0),
    etaMinutes: Number(row.eta_minutes || 0),
    currentLoad: row.current_load_number || undefined,
    position: [row.latitude, row.longitude],
    lastPingSeconds,
    fuelMpg: 0,
  };
}
