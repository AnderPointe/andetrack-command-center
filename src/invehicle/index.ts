/**
 * Phase 5 — In-vehicle surface barrel.
 */
export * from "./types";
export { createInVehicleAdapter, detectDefaultSurface } from "./registry";
export { CarPlayAdapter } from "./adapters/CarPlayAdapter";
export { AndroidAutoAdapter } from "./adapters/AndroidAutoAdapter";
export { WebSimAdapter } from "./adapters/WebSimAdapter";
export { useInVehicleSession } from "./hooks/useInVehicleSession";
