// Anderoute EliteNav — Phase 1 prototype types
export type DriverStatusKey =
  | "available"
  | "load_accepted"
  | "en_route_pickup"
  | "arrived_pickup"
  | "loading"
  | "loaded"
  | "en_route_dropoff"
  | "arrived_dropoff"
  | "delivered"
  | "break"
  | "off_duty"
  | "delayed"
  | "issue_reported";

export type VehicleKind =
  | "CDL Freight Truck"
  | "Hotshot"
  | "Box Truck"
  | "Cargo Van"
  | "Personal Vehicle"
  | "Flatbed"
  | "Reefer"
  | "Dry Van"
  | "Power Only"
  | "Step Deck";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseClass: "CDL-A" | "CDL-B" | "Non-CDL";
  cdl: boolean;
  status: DriverStatusKey;
  vehicleId: string;
  safetyScore: number;
  onTimePct: number;
  dispatcher: string;
}

export interface Vehicle {
  id: string;
  unit: string;
  type: VehicleKind;
  cdlRequired: boolean;
  heightFt: number;
  widthFt: number;
  lengthFt: number;
  weightLbs: number;
  axles: number;
  hazmatEnabled: boolean;
  trailerType: string;
  fuelType: "Diesel" | "Gas" | "Electric";
  averageMpg: number;
  plate: string;
}

export interface Load {
  id: string;
  pickup: string;
  dropoff: string;
  commodity: string;
  packageType: string;
  weightLbs: number;
  quantity: number;
  requiredVehicle: VehicleKind;
  requiresCDL: boolean;
  requiresHazmat: boolean;
  pickupWindow: string;
  deliveryWindow: string;
  estimatedMiles: number;
  estimatedDuration: string;
  dispatcherNote: string;
  customer: string;
  rate: number;
}

export interface Shipment {
  id: string;
  loadId: string;
  customer: string;
  commodity: string;
  packageType: string;
  weightLbs: number;
  quantity: number;
  pickupAddress: string;
  dropoffAddress: string;
  deliveryWindow: string;
  specialHandling: string;
  status: DriverStatusKey;
}

export type ManeuverKind =
  | "depart"
  | "turn-left"
  | "turn-right"
  | "keep-left"
  | "keep-right"
  | "straight"
  | "merge"
  | "exit"
  | "arrive";

export interface RouteStep {
  id: string;
  maneuver: ManeuverKind;
  instruction: string;
  distance: string;
  duration: string;
  street: string;
  alert?: string;
}

export interface Route {
  id: string;
  loadId: string;
  driverId: string;
  totalMiles: number;
  remainingMiles: number;
  etaMinutes: number;
  currentStep: number;
  steps: RouteStep[];
}

export interface NavigationSession {
  routeId: string;
  startedAt: string;
  safetyMode: boolean;
  driverStatus: DriverStatusKey;
}

export interface ETAUpdate {
  id: string;
  etaMinutes: number;
  delta: number; // minutes vs baseline
  reason: "traffic" | "reroute" | "tick" | "stop" | "manual";
  at: string;
}

export interface TrafficAlert {
  id: string;
  level: "clear" | "light" | "moderate" | "heavy";
  segment: string;
  delayMin: number;
}

export interface RouteRisk {
  id: string;
  kind: "deviation" | "low_bridge" | "weight" | "hazmat" | "weather" | "closure" | "tight_turn";
  severity: "info" | "warning" | "critical";
  message: string;
}

export interface CoPilotMessage {
  id: string;
  role: "copilot" | "dispatch" | "driver";
  tone?: "info" | "warning" | "success" | "alert";
  text: string;
  at: string;
}

export interface VoiceCommand {
  id: string;
  label: string;
  utterance: string;
}

export interface CoPilotTranscriptEntry {
  id: string;
  utterance: string;
  label: string;
  action: string;
  source: "voice" | "quick";
  status: "recognized" | "executed" | "ignored";
  at: string;
}

export interface DispatchSyncEvent {
  id: string;
  type: "gps" | "speed" | "eta" | "progress" | "status" | "delay" | "arrival" | "delivery" | "pod";
  message: string;
  at: string;
}
