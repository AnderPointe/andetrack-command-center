export type DriverStatus =
  | "available"
  | "en_route"
  | "delivering"
  | "delayed"
  | "offline";

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

export interface Telemetry {
  speedMph: number;
  fuelOrBatteryPercent: number;
  signalPercent: number;
  routeProgressPercent: number;
  tripStatus: string;
}
