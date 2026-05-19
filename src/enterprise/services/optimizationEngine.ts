/** Phase 7 — Optimization engine (mock/placeholder scoring). */
import type { SuggestedAssignment } from "../types";

interface MockDriver {
  id: string; name: string; available: boolean; cdl: boolean;
  vehicleType: string; hoursLeft: number; lat: number; lng: number;
  onTimePct: number; safetyScore: number;
}
interface MockLoad {
  id: string; label: string; requires_cdl: boolean; requires_hazmat: boolean;
  required_vehicle_type: string; pickup_lat: number; pickup_lng: number;
  miles: number; priority: "low" | "standard" | "high";
}

export function calculateDeadheadMiles(d: MockDriver, l: MockLoad): number {
  const dx = (d.lat - l.pickup_lat) * 69;
  const dy = (d.lng - l.pickup_lng) * 55;
  return Math.round(Math.sqrt(dx * dx + dy * dy));
}

export function calculateFuelCostEstimate(miles: number, mpg = 6.5, pricePerGal = 3.85): number {
  return Math.round((miles / mpg) * pricePerGal * 100) / 100;
}

export function calculateOnTimeProbability(d: MockDriver, deadhead: number): number {
  const base = d.onTimePct / 100;
  const penalty = Math.min(0.25, deadhead / 1000);
  return Math.max(0.4, Math.min(0.99, base - penalty));
}

export function calculateRouteRiskScore(d: MockDriver, l: MockLoad, deadhead: number): number {
  let r = 0;
  if (l.requires_cdl && !d.cdl) r += 40;
  if (l.required_vehicle_type !== d.vehicleType) r += 25;
  if (d.hoursLeft < 4) r += 20;
  r += Math.min(30, deadhead / 10);
  r += (100 - d.safetyScore) / 5;
  return Math.round(Math.max(0, Math.min(100, r)));
}

export function scoreDriverForLoad(d: MockDriver, l: MockLoad): SuggestedAssignment {
  const deadhead = calculateDeadheadMiles(d, l);
  const onTime = calculateOnTimeProbability(d, deadhead);
  const risk = calculateRouteRiskScore(d, l, deadhead);
  const vehicleMatch = d.vehicleType === l.required_vehicle_type;
  const cdlMatch = !l.requires_cdl || d.cdl;
  const fuel = calculateFuelCostEstimate(deadhead + l.miles);
  const priorityBoost = l.priority === "high" ? 5 : 0;
  const score = Math.round(
    Math.max(0, Math.min(100,
      60 + (vehicleMatch ? 15 : -10) + (cdlMatch ? 10 : -25)
      + (onTime * 20) - (risk * 0.3) - (deadhead / 30) + priorityBoost
    ))
  );
  const etaPickup = Math.round(deadhead / 50 * 60);
  const explain = [
    vehicleMatch ? "Vehicle match" : "Vehicle mismatch",
    cdlMatch ? "CDL OK" : "CDL missing",
    `${deadhead} mi deadhead`,
    `${Math.round(onTime * 100)}% on-time prob`,
    `risk ${risk}`,
  ].join(" · ");
  return {
    loadId: l.id, loadLabel: l.label, driverId: d.id, driverName: d.name,
    matchScore: score, deadheadMiles: deadhead, etaToPickupMin: etaPickup,
    vehicleMatch, cdlMatch, riskScore: risk,
    estimatedFuelCost: fuel, onTimeProbability: onTime, explanation: explain,
  };
}

export function rankSuggestedDrivers(drivers: MockDriver[], load: MockLoad): SuggestedAssignment[] {
  return drivers
    .filter((d) => d.available)
    .map((d) => scoreDriverForLoad(d, load))
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function detectAtRiskDeliveries(suggestions: SuggestedAssignment[]) {
  return suggestions.filter((s) => s.riskScore > 50 || s.onTimeProbability < 0.7);
}

// Mock seed data for the Optimization Center demo
export const MOCK_DRIVERS: MockDriver[] = [
  { id: "drv-01", name: "Marcus Chen",   available: true,  cdl: true,  vehicleType: "dry_van",      hoursLeft: 8, lat: 32.78, lng: -96.80, onTimePct: 96, safetyScore: 94 },
  { id: "drv-02", name: "Sara Williams", available: true,  cdl: true,  vehicleType: "reefer",       hoursLeft: 5, lat: 32.90, lng: -97.04, onTimePct: 91, safetyScore: 88 },
  { id: "drv-03", name: "Diego Ramirez", available: true,  cdl: true,  vehicleType: "flatbed",      hoursLeft: 3, lat: 33.10, lng: -96.61, onTimePct: 85, safetyScore: 82 },
  { id: "drv-04", name: "Priya Patel",   available: true,  cdl: false, vehicleType: "sprinter_van", hoursLeft: 9, lat: 32.74, lng: -96.96, onTimePct: 98, safetyScore: 97 },
  { id: "drv-05", name: "James Okafor",  available: true,  cdl: true,  vehicleType: "dry_van",      hoursLeft: 7, lat: 32.60, lng: -97.30, onTimePct: 89, safetyScore: 90 },
];

export const MOCK_LOADS: MockLoad[] = [
  { id: "L-2041", label: "L-2041 · Dallas → Houston (CDL dry van)", requires_cdl: true,  requires_hazmat: false, required_vehicle_type: "dry_van",  pickup_lat: 32.78, pickup_lng: -96.80, miles: 240, priority: "high" },
  { id: "L-2042", label: "L-2042 · Plano → Austin (reefer)",        requires_cdl: true,  requires_hazmat: false, required_vehicle_type: "reefer",   pickup_lat: 33.02, pickup_lng: -96.69, miles: 215, priority: "standard" },
  { id: "L-2043", label: "L-2043 · Local courier (sprinter)",       requires_cdl: false, requires_hazmat: false, required_vehicle_type: "sprinter_van", pickup_lat: 32.77, pickup_lng: -96.79, miles: 38, priority: "standard" },
];
