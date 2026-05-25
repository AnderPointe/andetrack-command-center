/**
 * Map search / geocoding abstraction.
 *
 * Production geocoding should use self-hosted Nominatim, Pelias, Photon,
 * or a proper geocoding provider. Public Nominatim has strict rate limits
 * and is NOT suitable for production traffic.
 */
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi } from "@/types/map";

export type SearchResultKind =
  | "driver"
  | "unit"
  | "load"
  | "poi"
  | "warehouse"
  | "customer"
  | "airport"
  | "store"
  | "landmark"
  | "city"
  | "address"
  | "unknown";

export interface SearchResult {
  id: string;
  label: string;
  sublabel?: string;
  lat: number;
  lng: number;
  kind: SearchResultKind;
  zoom?: number;
}

export interface SearchInputs {
  query: string;
  drivers: DispatchDriver[];
  pois: LogisticsPoi[];
}

export function searchMapLocation({ query, drivers, pois }: SearchInputs): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  for (const d of drivers) {
    const hay = [d.driver_name, d.unit_number, d.current_load_number, d.city, d.vehicle_type]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `driver:${d.driver_id}`,
        label: d.driver_name ?? d.unit_number ?? "Driver",
        sublabel: `Unit ${d.unit_number ?? "—"} · ${d.status}`,
        lat: d.latitude,
        lng: d.longitude,
        kind: d.unit_number?.toLowerCase().includes(q) ? "unit" : "driver",
        zoom: 12,
      });
    }
  }

  for (const p of pois) {
    if (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
      results.push({
        id: `poi:${p.id}`,
        label: p.name,
        sublabel: p.category.replace(/_/g, " "),
        lat: p.latitude,
        lng: p.longitude,
        kind: mapCategoryToKind(p.category),
        zoom: 11,
      });
    }
  }

  return results.slice(0, 24);
}

function mapCategoryToKind(cat: string): SearchResultKind {
  switch (cat) {
    case "warehouse":
      return "warehouse";
    case "customer":
      return "customer";
    case "airport":
      return "airport";
    case "store":
      return "store";
    case "landmark":
      return "landmark";
    default:
      return "poi";
  }
}
