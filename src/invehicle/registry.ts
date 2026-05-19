/**
 * Phase 5 — In-vehicle adapter registry.
 *
 * The web sim is the only adapter that actually does work in the Lovable
 * preview. CarPlay / Android Auto stubs document their native wiring path.
 */
import type { InVehicleSurfaceAdapter, InVehicleSurfaceId } from "./types";
import { CarPlayAdapter } from "./adapters/CarPlayAdapter";
import { AndroidAutoAdapter } from "./adapters/AndroidAutoAdapter";
import { WebSimAdapter } from "./adapters/WebSimAdapter";

interface CreateOpts {
  driverId: string;
  companyId: string;
}

export function createInVehicleAdapter(
  id: InVehicleSurfaceId,
  opts: CreateOpts,
): InVehicleSurfaceAdapter {
  switch (id) {
    case "carplay":      return new CarPlayAdapter();
    case "android_auto": return new AndroidAutoAdapter();
    case "web_sim":
    default:             return new WebSimAdapter(opts.driverId, opts.companyId);
  }
}

export function detectDefaultSurface(): InVehicleSurfaceId {
  // Real native shells would inspect connection state here.
  return "web_sim";
}
