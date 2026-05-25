export type DriverStatus =
  | "available"
  | "en_route"
  | "delivering"
  | "delayed"
  | "offline"
  | "break";

export type ArrivalStatus = "on_time" | "delayed" | "early";

export interface Driver {
  id: string;
  company_id: string;
  user_id: string;
  name: string;
  role: string;
  photo_url: string;
  phone: string;
  status: DriverStatus;
  current_lat: number;
  current_lng: number;
  speed_mph: number;
  bearing: number;
  last_seen_at: string;
  vehicle_id: string;
}

export interface Vehicle {
  id: string;
  company_id: string;
  unit_number: string;
  make: string;
  model: string;
  type: string;
  plate: string;
  fuel_level: number;
  battery_level: number | null;
  engine_status: string;
  temperature_status: string;
}

export interface Shipment {
  id: string;
  company_id: string;
  driver_id: string;
  vehicle_id: string;
  cargo_type: string;
  hauling_description: string;
  pickup_address: string;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_address: string;
  dropoff_lat: number;
  dropoff_lng: number;
  eta_minutes: number;
  scheduled_arrival: string;
  arrival_status: ArrivalStatus;
  priority: "low" | "standard" | "high" | "critical";
  space_used_percent: number;
  capacity_used_percent: number;
  weight: number;
  volume: number;
  route_progress_percent: number;
  status: string;
}

export interface CargoManifest {
  id: string;
  shipment_id: string;
  category: string;
  item_count: number;
  weight: number;
  volume: number;
  special_handling_notes: string;
  temperature_requirement: string;
  hazmat: boolean;
  priority: "low" | "standard" | "high" | "critical";
}

export interface DriverDossier {
  driver: Driver;
  vehicle: Vehicle;
  shipment: Shipment;
  manifest: CargoManifest;
}
