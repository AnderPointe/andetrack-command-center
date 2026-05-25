/**
 * Routing service abstraction.
 *
 * Currently returns a straight-line placeholder. Swap in OSRM, Valhalla,
 * or GraphHopper later by implementing the same interface. For truck
 * routing prefer Valhalla or a commercial truck-aware provider.
 */
import type { RoutePoint, RouteResult } from "@/types/map";

function haversineMeters(a: RoutePoint, b: RoutePoint) {
  const R = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export async function calculateRoute(
  origin: RoutePoint,
  destination: RoutePoint,
): Promise<RouteResult> {
  const distance = haversineMeters(origin, destination);
  return {
    geometry: [origin, destination],
    distanceMeters: distance,
    durationSeconds: distance / 25, // ~55mph placeholder
    provider: "placeholder",
  };
}
