export type DriverStatus =
  | "available"
  | "en_route"
  | "delivering"
  | "delayed"
  | "offline";

export type TripStatus = "on_time" | "delayed" | "early" | "stopped";

export interface Driver {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  phone: string;
  status: DriverStatus;
}

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
  speed_mph: number;
  fuel_percent: number;
  battery_percent: number;
  signal_percent: number;
}

export interface MapPoint {
  lat: number;
  lng: number;
}

export interface RouteGeo {
  pickup: MapPoint;
  dropoff: MapPoint;
  current: MapPoint;
}
