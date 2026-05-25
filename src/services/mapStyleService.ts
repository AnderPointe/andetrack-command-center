/**
 * Map style abstraction.
 *
 * The map style controls which road layers are visible. A production
 * Anderoute logistics style should emphasize highways, interstates,
 * industrial roads, warehouses, ports, airports, and truck routes.
 *
 * For production, replace the demo style with OpenMapTiles, OpenFreeMap,
 * or another OpenStreetMap-based vector tile provider. Public demo tiles
 * are not for production scale.
 */
export interface MapStyleDescriptor {
  id: string;
  label: string;
  url: string;
  description: string;
}

export const ANDEROUTE_MAP_STYLES: MapStyleDescriptor[] = [
  {
    id: "liberty",
    label: "Anderoute Liberty",
    url: "https://tiles.openfreemap.org/styles/liberty",
    description: "OpenStreetMap vector (OpenFreeMap Liberty). 3D buildings supported.",
  },
  {
    id: "positron",
    label: "Anderoute Light",
    url: "https://tiles.openfreemap.org/styles/positron",
    description: "Light cartographic OSM style for daytime dispatch.",
  },
  {
    id: "demotiles",
    label: "Demotiles",
    url: "https://demotiles.maplibre.org/style.json",
    description: "MapLibre demotiles — dev only, no building data.",
  },
];

export function resolveActiveStyleUrl(): string {
  return (
    (import.meta.env.VITE_MAP_STYLE_URL as string | undefined) ||
    ANDEROUTE_MAP_STYLES[0].url
  );
}
