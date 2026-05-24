/**
 * Anderoute3DDispatchMap
 *
 * Main premium 3D-capable live dispatch map. Wraps AnderouteDispatchMap
 * (MapLibre GL + OpenStreetMap-based vector tiles) with the Anderoute
 * layer-toggle control panel.
 *
 * Tile style:
 *   - Reads VITE_MAP_STYLE_URL at runtime (inside AnderouteDispatchMap).
 *   - Dev fallback: https://demotiles.maplibre.org/style.json
 *   - PRODUCTION: point VITE_MAP_STYLE_URL at a self-hosted OpenMapTiles /
 *     OpenFreeMap deployment or a commercial OSM-based vector tile provider.
 *
 * 3D buildings:
 *   - Requires vector tiles whose source layer is named "building" and
 *     exposes height attributes (e.g. render_height, render_min_height).
 *   - If the style does not include building height data, the layer renders
 *     nothing — the rest of the map keeps working.
 */
import { useCallback, useState } from "react";
import type { Map as MLMap } from "maplibre-gl";
import { AnderouteDispatchMap, type DispatchLayerKey } from "./AnderouteDispatchMap";
import {
  Anderoute3DLayerPanel,
  DEFAULT_VISIBLE_LAYERS,
} from "./Anderoute3DLayerPanel";
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi } from "@/types/map";
import type { DispatchLoad } from "@/types/loads";

interface Props {
  drivers: DispatchDriver[];
  pois: LogisticsPoi[];
  loads?: DispatchLoad[];
  selectedDriverId: string | null;
  onSelectDriver: (id: string | null) => void;
  selectedLoadId?: string | null;
  onSelectLoad?: (id: string | null) => void;
  mapRef: React.MutableRefObject<MLMap | null>;
}

export function Anderoute3DDispatchMap(props: Props) {
  const [visibleLayers, setVisibleLayers] = useState<Set<DispatchLayerKey>>(
    () => new Set(DEFAULT_VISIBLE_LAYERS),
  );

  const toggleLayer = useCallback((key: DispatchLayerKey) => {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <div className="relative h-full w-full">
      <AnderouteDispatchMap {...props} visibleLayers={visibleLayers} />
      <Anderoute3DLayerPanel visible={visibleLayers} onToggle={toggleLayer} />
    </div>
  );
}

export default Anderoute3DDispatchMap;
