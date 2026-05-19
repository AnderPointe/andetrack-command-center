/** Phase 7 — Rate engine (placeholder calculator). */
import type { RateQuoteInput, RateQuoteResult } from "../types";

const URGENCY_MULT: Record<string, number> = { standard: 1, expedited: 1.35, team: 1.75 };
const VEHICLE_BASE: Record<string, number> = {
  dry_van: 2.05, reefer: 2.55, flatbed: 2.45, sprinter_van: 1.65, box_truck: 1.85,
};

export function calculateBaseRate(input: RateQuoteInput): number {
  const perMile: number = (input.vehicleType ? VEHICLE_BASE[input.vehicleType] : undefined) ?? 2.1;
  const urgency: number = URGENCY_MULT[input.urgency ?? "standard"] ?? 1;
  return Math.round(input.miles * perMile * urgency * 100) / 100;
}

export function calculateFuelSurcharge(miles: number, mpg = 6.5, basePrice = 3.0, currentPrice = 3.85): number {
  const delta = Math.max(0, currentPrice - basePrice);
  return Math.round((miles / mpg) * delta * 100) / 100;
}

export function calculateAccessorials(input: RateQuoteInput) {
  const items: { label: string; amount: number }[] = [];
  if (input.hazmat) items.push({ label: "Hazmat fee", amount: 175 });
  if (input.afterHours) items.push({ label: "After-hours pickup", amount: 95 });
  if ((input.weight ?? 0) > 40000) items.push({ label: "Heavy weight surcharge", amount: 140 });
  return items;
}

export function calculateRateQuote(input: RateQuoteInput): RateQuoteResult {
  const baseRate = calculateBaseRate(input);
  const fuelSurcharge = calculateFuelSurcharge(input.miles);
  const accessorials = calculateAccessorials(input);
  const accTotal = accessorials.reduce((s, a) => s + a.amount, 0);
  const total = Math.round((baseRate + fuelSurcharge + accTotal) * 100) / 100;
  const driverPay = Math.round(total * 0.32 * 100) / 100;
  const marginPct = Math.round(((total - driverPay - input.miles * 0.18) / total) * 100);
  return { baseRate, fuelSurcharge, accessorials, total, driverPayEstimate: driverPay, marginPct };
}
