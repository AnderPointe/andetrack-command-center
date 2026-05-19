import type {
  CoPilotMessage,
  DispatchSyncEvent,
  NavManeuver,
  VehicleProfile,
  VoiceCommand,
} from "@/types/copilot";

export const eliteVehicleProfile: VehicleProfile = {
  type: "CDL Freight (Reefer)",
  cdlRequired: true,
  heightFt: 13.5,
  widthFt: 8.5,
  lengthFt: 53,
  weightLbs: 78400,
  axles: 5,
  hazmatEnabled: false,
  trailerType: "Refrigerated 53ft",
  fuelType: "Diesel",
  averageMpg: 6.8,
};

export const eliteManeuvers: NavManeuver[] = [
  { id: "m1", type: "depart", instruction: "Depart pickup facility", street: "S Industrial Blvd", distance: "0.3 mi", duration: "1 min" },
  { id: "m2", type: "turn-right", instruction: "Turn right onto I-20 E", street: "I-20 East", distance: "1.2 mi", duration: "3 min" },
  { id: "m3", type: "keep-left", instruction: "Keep left to merge onto US-287", street: "US-287 N", distance: "14 mi", duration: "16 min", alert: "Construction zone — reduced lanes" },
  { id: "m4", type: "straight", instruction: "Continue on US-287 N", street: "US-287 N", distance: "62 mi", duration: "58 min" },
  { id: "m5", type: "exit", instruction: "Take Exit 42 toward Logistics Parkway", street: "Exit 42", distance: "8 mi", duration: "9 min" },
  { id: "m6", type: "turn-left", instruction: "Turn left at Distribution Center Drive", street: "Distribution Ctr Dr", distance: "0.6 mi", duration: "2 min", alert: "Low clearance 13'9\" — truck route verified" },
  { id: "m7", type: "arrive", instruction: "Arrive at delivery gate on the right", street: "Gate 4 — Dock 12", distance: "0.1 mi", duration: "1 min" },
];

export const initialCoPilotFeed: CoPilotMessage[] = [
  { id: "c1", role: "copilot", tone: "info", text: "Route locked. You are 18 minutes from pickup.", timestamp: "now" },
  { id: "c2", role: "copilot", tone: "info", text: "Traffic is light on I-20 East. ETA holds steady.", timestamp: "1m" },
  { id: "c3", role: "dispatch", text: "Gate 4 is open. Ask for Marcus at receiving.", timestamp: "3m" },
  { id: "c4", role: "copilot", tone: "warning", text: "Driver break window approaching in 1h 42m.", timestamp: "4m" },
];

export const suggestedCommands: VoiceCommand[] = [
  { id: "vc1", label: "What is my ETA?", utterance: "ETA" },
  { id: "vc2", label: "Repeat next turn", utterance: "Repeat next turn" },
  { id: "vc3", label: "Contact dispatch", utterance: "Call dispatch" },
  { id: "vc4", label: "Report delay", utterance: "Report delay" },
  { id: "vc5", label: "Mark arrived", utterance: "Arrived" },
  { id: "vc6", label: "Mark loaded", utterance: "Loaded" },
  { id: "vc7", label: "Mark delivered", utterance: "Delivered" },
  { id: "vc8", label: "Read shipment details", utterance: "Shipment" },
  { id: "vc9", label: "Find fuel nearby", utterance: "Fuel" },
  { id: "vc10", label: "Show alternate route", utterance: "Alt route" },
];

export const initialDispatchSync: DispatchSyncEvent[] = [
  { id: "d1", type: "gps", message: "GPS ping sent · 41.85, -87.65", timestamp: "2s" },
  { id: "d2", type: "status", message: "Status → En route to pickup", timestamp: "12s" },
  { id: "d3", type: "eta", message: "ETA updated → 18 min", timestamp: "47s" },
];

export const denyReasons = [
  "Vehicle unavailable",
  "Too far",
  "Break required",
  "Equipment mismatch",
  "Driver off duty",
  "Load details issue",
  "Other",
] as const;
