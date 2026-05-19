// Anderoute CoPilot + EliteNav types
export type NavPhase =
  | "offered"
  | "to_pickup"
  | "at_pickup"
  | "loading"
  | "loaded"
  | "to_dropoff"
  | "at_dropoff"
  | "delivered";

export type TrafficLevel = "light" | "moderate" | "heavy" | "severe";
export type RouteRisk = "low" | "elevated" | "high";

export interface CoPilotMessage {
  id: string;
  role: "copilot" | "driver" | "dispatch";
  text: string;
  timestamp: string;
  tone?: "info" | "warning" | "success" | "danger";
}

export interface VoiceCommand {
  id: string;
  label: string;
  utterance: string;
  icon?: string;
}

export interface VehicleProfile {
  type: string;
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
}

export interface NavManeuver {
  id: string;
  type:
    | "depart"
    | "merge"
    | "turn-left"
    | "turn-right"
    | "keep-left"
    | "keep-right"
    | "exit"
    | "arrive"
    | "straight";
  instruction: string;
  street: string;
  distance: string;
  duration: string;
  alert?: string;
}

export interface DispatchSyncEvent {
  id: string;
  type: "gps" | "status" | "eta" | "delay" | "arrival" | "delivery" | "pod";
  message: string;
  timestamp: string;
}
