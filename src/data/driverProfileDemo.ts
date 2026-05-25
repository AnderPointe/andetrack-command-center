/**
 * Demo augment data for the driver profile dashboard.
 *
 * The dispatch board only carries lightweight live driver rows. The full
 * profile screen needs richer context (cargo, vehicle telemetry, ETA,
 * shipment IDs). This module returns a deterministic mock derived from the
 * driver id so the layout always has data to render. When the backend grows
 * `driver_profiles`, `shipments`, and `vehicle_telemetry` tables, swap this
 * for Supabase queries — the prop shape stays the same.
 */
import type { DispatchDriver } from "@/types/dispatch";

export interface DriverProfileDemo {
  shipmentId: string;
  vehicleId: string;
  cargo: {
    title: string;
    commodity: string;
    weightLbs: number;
    pallets: number;
    tempF?: number;
    sealNumber: string;
    rateUsd: number;
  };
  pickup: {
    name: string;
    address: string;
    window: string;
    contact: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    name: string;
    address: string;
    window: string;
    contact: string;
    lat: number;
    lng: number;
  };
  telemetry: {
    fuelPct: number;
    engineTempF: number;
    odometerMi: number;
    trailerTempF?: number;
    tirePressurePsi: number;
    nextServiceMi: number;
  };
  eta: {
    arrivalIso: string;
    minutesRemaining: number;
    remainingMiles: number;
    totalMiles: number;
    progressPct: number;
  };
  driver: {
    photoUrl?: string;
    licenseClass: string;
    yearsExperience: number;
    safetyScore: number;
    onTimePct: number;
    homeBase: string;
    dispatcher: string;
  };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function buildDriverProfileDemo(d: DispatchDriver): DriverProfileDemo {
  const seed = hash(d.driver_id || "x");
  const totalMiles = 240 + (seed % 380);
  const remainingMiles = Math.max(8, totalMiles - 60 - (seed % 90));
  const progressPct = Math.round(((totalMiles - remainingMiles) / totalMiles) * 100);
  const minutes = d.eta_minutes ?? 30 + (seed % 110);
  const lat = d.latitude || 32.78;
  const lng = d.longitude || -96.8;

  return {
    shipmentId: `SHP-${77000 + (seed % 9000)}`,
    vehicleId: `VEH-${d.unit_number ?? (seed % 9000).toString().padStart(4, "0")}`,
    cargo: {
      title: "Refrigerated Produce — Palletized",
      commodity: "Organic Berries · 34°F",
      weightLbs: 38000 + (seed % 6000),
      pallets: 22 + (seed % 6),
      tempF: 36,
      sealNumber: `SL-${100000 + (seed % 90000)}`,
      rateUsd: 1450 + (seed % 900),
    },
    pickup: {
      name: "Coldfront Distribution",
      address: d.pickup_address ?? "2410 S Industrial Blvd, Dallas TX 75215",
      window: "Today · 14:00 – 15:30 CT",
      contact: "Marcus @ Gate 4 · (214) 555-0181",
      lat: lat + 0.08,
      lng: lng - 0.12,
    },
    dropoff: {
      name: "Meridian Foods DC",
      address: d.dropoff_address ?? "18420 Logistics Pkwy, Fort Worth TX 76131",
      window: "Today · 18:00 – 19:30 CT",
      contact: "Receiving Dock 12 · (817) 555-0244",
      lat: lat - 0.06,
      lng: lng + 0.18,
    },
    telemetry: {
      fuelPct: 42 + (seed % 50),
      engineTempF: 188 + (seed % 14),
      odometerMi: 184_220 + (seed % 4000),
      trailerTempF: 36,
      tirePressurePsi: 102 + (seed % 8),
      nextServiceMi: 2200 - (seed % 1800),
    },
    eta: {
      arrivalIso: new Date(Date.now() + minutes * 60_000).toISOString(),
      minutesRemaining: minutes,
      remainingMiles,
      totalMiles,
      progressPct,
    },
    driver: {
      photoUrl: undefined,
      licenseClass: "CDL-A",
      yearsExperience: 4 + (seed % 14),
      safetyScore: 92 + (seed % 8),
      onTimePct: 94 + (seed % 6),
      homeBase: d.city ?? "Dallas, TX",
      dispatcher: "Alicia Romero",
    },
  };
}
