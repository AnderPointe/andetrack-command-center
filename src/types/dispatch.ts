import type { DriverStatus, LiveDriver } from "./map";

export type ViewMode = "timeline" | "week" | "list" | "map";

export type LoadStatus =
  | "pending"
  | "offered"
  | "accepted"
  | "in_progress"
  | "delivered"
  | "cancelled";

export type VehicleType =
  | "semi"
  | "hotshot"
  | "box_truck"
  | "cargo_van"
  | "personal_vehicle";

export interface DispatchDriver extends LiveDriver {
  shift_start?: string | null;
  shift_end?: string | null;
  city?: string | null;
  region?: string | null;
  avatar_url?: string | null;
  pickup_address?: string | null;
  dropoff_address?: string | null;
  next_stop?: string | null;
}

export interface DispatchFilters {
  search: string;
  driverStatus: Set<DriverStatus>;
  loadStatus: Set<LoadStatus>;
  vehicleType: Set<VehicleType>;
  region: string | "all";
}

export type { DriverStatus };
