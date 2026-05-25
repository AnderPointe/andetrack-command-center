export type DriverStatus =
  | "available"
  | "en_route"
  | "delivering"
  | "delayed"
  | "offline";

export type TripStatus = "on_time" | "delayed" | "early" | "stopped";

export interface DriverProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  phone: string;
  status: DriverStatus;
  vehicle: string;
  pickupAddress: string;
  dropoffAddress: string;
  currentAssignment: string;
  etaMinutes: number;
  lastUpdated: string;
}

/* Legacy alias used by existing components */
export interface Driver {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  phone: string;
  status: DriverStatus;
}

export interface ShipmentLoad {
  id: string;
  vehicleName: string;
  vehicleType: string;
  cargoType: string;
  weightKg: number;
  capacityUsedPercent: number;
  volumeUsed: string;
  spaceUsedLabel: string;
}

/* Legacy alias used by existing components */
export interface Shipment {
  id: string;
  cargo_type: string;
  vehicle_type: string;
  weight_kg: number;
  capacity_percent: number;
  volume_cuft: number;
  space_utilization_percent: number;
  pickup_address: string;
  dropoff_address: string;
  eta_minutes: number;
  scheduled_arrival_at: string;
  route_progress: number;
  trip_status: TripStatus;
}

export interface Telemetry {
  speedMph: number;
  fuelOrBatteryPercent: number;
  signalPercent: number;
  routeProgressPercent: number;
  tripStatus: string;

  /* Legacy snake_case fields used by existing components */
  speed_mph: number;
  fuel_percent: number;
  battery_percent: number;
  signal_percent: number;
}

export interface RouteGeo {
  pickup: { lat: number; lng: number };
  dropoff: { lat: number; lng: number };
  current: { lat: number; lng: number };
}
