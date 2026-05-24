/**
 * Map search / geocoding abstraction.
 *
 * Production note: public Nominatim has strict rate limits and is not
 * suitable for production traffic. Self-host Nominatim or use a paid
 * geocoder (Mapbox, HERE, MapTiler, etc.) when going live.
 */
export interface SearchResult {
  label: string;
  lat: number;
  lng: number;
  kind:
    | "address"
    | "city"
    | "driver"
    | "unit"
    | "load"
    | "customer"
    | "warehouse"
    | "store"
    | "airport"
    | "landmark"
    | "unknown";
}

export async function searchMapLocation(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];
  // Placeholder — wire to your geocoder + internal Supabase entities later.
  return [
    {
      label: `Placeholder result for "${q}"`,
      lat: 39.8283,
      lng: -98.5795,
      kind: "unknown",
    },
  ];
}
