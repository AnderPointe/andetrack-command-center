/**
 * Anderoute3DDispatchMap — Map Intelligence Layer
 *
 * Wraps the MapLibre dispatch map with the full Anderoute intelligence
 * control suite:
 *   - Search (drivers, units, POIs, places)
 *   - Layer toggles (operations, places, world, overlays)
 *   - POI panel (filter + jump)
 *   - Saved views (US, TX, DFW, dispatch presets)
 *   - Geofences (delivery, customer, yard, restricted, airport, port)
 *   - Selected-object card (driver / POI / geofence)
 *   - Realtime connection badge
 *
 * Safety:
 *   - Browser uses VITE_SUPABASE_ANON_KEY only.
 *   - RLS remains enforced on logistics_map_pois / driver_location_current.
 *   - No Google Maps, no paid Google APIs — OpenStreetMap vector tiles only.
 *   - Service role keys never reach the browser.
 *
 * Tile style:
 *   - Reads VITE_MAP_STYLE_URL at runtime (resolved in AnderouteDispatchMap).
 *   - Production: point at OpenMapTiles / OpenFreeMap / commercial OSM
 *     vector provider; public demo tiles are not for production scale.
 */
import { useCallback, useMemo, useState } from "react";
import type { Map as MLMap } from "maplibre-gl";
import { Wifi, WifiOff, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { AnderouteDispatchMap, type DispatchLayerKey } from "./AnderouteDispatchMap";
import { MapLayerControlPanel } from "./MapLayerControlPanel";
import { MapPoiPanel } from "./MapPoiPanel";
import { MapSearchPanel } from "./MapSearchPanel";
import { MapSavedViewsPanel } from "./MapSavedViewsPanel";
import { MapGeofencePanel } from "./MapGeofencePanel";
import { SelectedMapObjectCard } from "./SelectedMapObjectCard";
import { useMapLayerPreferences } from "@/hooks/useMapLayerPreferences";
import { useMapSavedViews, type SavedMapView } from "@/hooks/useMapSavedViews";
import { useMapGeofences, type MapGeofence, type GeofenceInput } from "@/hooks/useMapGeofences";
import { MapGeofenceFormDialog } from "./MapGeofenceFormDialog";
import { toast } from "sonner";
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
  realtimeStatus?: "connected" | "connecting" | "offline";
}

type ObjectSel =
  | { type: "poi"; poi: LogisticsPoi }
  | { type: "geofence"; geofence: MapGeofence }
  | null;

export function Anderoute3DDispatchMap(props: Props) {
  const { visible, toggle } = useMapLayerPreferences();
  const savedViews = useMapSavedViews();
  const { geofences, canEdit, create: createGeofence, update: updateGeofence, remove: removeGeofence } = useMapGeofences();

  const [railOpen, setRailOpen] = useState(true);
  const [objectSel, setObjectSel] = useState<ObjectSel>(null);
  const [geofenceDialog, setGeofenceDialog] = useState<
    { open: false } | { open: true; mode: "create" | "edit"; initial: MapGeofence | null }
  >({ open: false });

  const openCreateGeofence = useCallback(() => {
    setGeofenceDialog({ open: true, mode: "create", initial: null });
  }, []);
  const openEditGeofence = useCallback((g: MapGeofence) => {
    setGeofenceDialog({ open: true, mode: "edit", initial: g });
  }, []);
  const closeGeofenceDialog = useCallback(() => setGeofenceDialog({ open: false }), []);

  const handleGeofenceSubmit = useCallback(
    async (input: GeofenceInput) => {
      if (geofenceDialog.open && geofenceDialog.mode === "edit" && geofenceDialog.initial) {
        const updated = await updateGeofence(geofenceDialog.initial.id, input);
        toast.success("Geofence updated");
        setObjectSel({ type: "geofence", geofence: updated });
      } else {
        const created = await createGeofence(input);
        toast.success("Geofence created");
        setObjectSel({ type: "geofence", geofence: created });
      }
    },
    [geofenceDialog, createGeofence, updateGeofence],
  );

  const handleGeofenceDelete = useCallback(async () => {
    if (!(geofenceDialog.open && geofenceDialog.mode === "edit" && geofenceDialog.initial)) return;
    await removeGeofence(geofenceDialog.initial.id);
    toast.success("Geofence deleted");
    setObjectSel(null);
  }, [geofenceDialog, removeGeofence]);

  const flyTo = useCallback(
    (lng: number, lat: number, opts?: { zoom?: number; pitch?: number; bearing?: number }) => {
      props.mapRef.current?.flyTo({
        center: [lng, lat],
        zoom: opts?.zoom ?? 11,
        pitch: opts?.pitch ?? 45,
        bearing: opts?.bearing ?? 0,
        duration: 1000,
      });
    },
    [props.mapRef],
  );

  const applyView = useCallback(
    (v: SavedMapView) => {
      props.mapRef.current?.flyTo({
        center: v.center,
        zoom: v.zoom,
        pitch: v.pitch ?? 35,
        bearing: v.bearing ?? 0,
        duration: 1200,
      });
    },
    [props.mapRef],
  );

  const selectedDriver = useMemo(
    () => props.drivers.find((d) => d.driver_id === props.selectedDriverId) ?? null,
    [props.drivers, props.selectedDriverId],
  );

  const cardSelection =
    selectedDriver != null
      ? ({ type: "driver" as const, driver: selectedDriver })
      : objectSel?.type === "poi"
      ? ({ type: "poi" as const, poi: objectSel.poi as any })
      : objectSel?.type === "geofence"
      ? ({ type: "geofence" as const, geofence: objectSel.geofence })
      : null;

  return (
    <div className="relative h-full w-full">
      <AnderouteDispatchMap {...props} visibleLayers={visible} />

      {/* Top-left: search + realtime badge */}
      <div className="pointer-events-none absolute left-4 top-4 z-[450] flex flex-col gap-2">
        <RealtimeBadge status={props.realtimeStatus ?? "connecting"} />
        <MapSearchPanel
          drivers={props.drivers}
          pois={props.pois}
          onResult={(r) => {
            flyTo(r.lng, r.lat, { zoom: r.zoom ?? 11 });
            if (r.id.startsWith("driver:")) {
              props.onSelectDriver(r.id.split(":")[1]);
            } else if (r.id.startsWith("poi:")) {
              const id = r.id.split(":")[1];
              const poi = props.pois.find((p) => p.id === id);
              if (poi) setObjectSel({ type: "poi", poi });
            }
          }}
        />
      </div>

      {/* Right rail: collapsible stack of control panels */}
      <div className="pointer-events-none absolute right-4 top-4 z-[450] flex max-h-[calc(100%-2rem)] items-start gap-2">
        <button
          onClick={() => setRailOpen((o) => !o)}
          className="pointer-events-auto grid size-8 place-items-center rounded-full border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-lg hover:bg-slate-800"
          title={railOpen ? "Collapse panels" : "Expand panels"}
        >
          {railOpen ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
        {railOpen && (
          <div className="flex max-h-full flex-col gap-2 overflow-y-auto pr-1">
            <MapLayerControlPanel visible={visible} onToggle={toggle} />
            <MapPoiPanel
              pois={props.pois}
              onFocus={(poi) => {
                flyTo(poi.longitude, poi.latitude, { zoom: 12 });
                setObjectSel({ type: "poi", poi });
              }}
            />
            <MapSavedViewsPanel views={savedViews} onApply={applyView} />
            {visible.has("geofences") && (
              <MapGeofencePanel
                geofences={geofences}
                canEdit={canEdit}
                onCreate={openCreateGeofence}
                onEdit={openEditGeofence}
                onFocus={(g) => {
                  flyTo(g.center[0], g.center[1], { zoom: 12 });
                  setObjectSel({ type: "geofence", geofence: g });
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom: selected object card */}
      {cardSelection && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-[500] -translate-x-1/2">
          <SelectedMapObjectCard
            selected={cardSelection}
            onClose={() => {
              if (cardSelection.type === "driver") props.onSelectDriver(null);
              setObjectSel(null);
            }}
            onEditZone={
              cardSelection.type === "geofence" && canEdit
                ? () => openEditGeofence(cardSelection.geofence)
                : undefined
            }
          />
        </div>
      )}

      <MapGeofenceFormDialog
        open={geofenceDialog.open}
        mode={geofenceDialog.open ? geofenceDialog.mode : "create"}
        initial={geofenceDialog.open ? geofenceDialog.initial : null}
        defaultCenter={(() => {
          const c = props.mapRef.current?.getCenter();
          return c ? [c.lng, c.lat] : undefined;
        })()}
        canEdit={canEdit}
        onClose={closeGeofenceDialog}
        onSubmit={handleGeofenceSubmit}
        onDelete={
          geofenceDialog.open && geofenceDialog.mode === "edit"
            ? handleGeofenceDelete
            : undefined
        }
      />
    </div>
  );
}
    </div>
  );
}

function RealtimeBadge({ status }: { status: "connected" | "connecting" | "offline" }) {
  const cfg =
    status === "connected"
      ? { icon: Wifi, text: "Realtime Connected", cls: "bg-teal-500/20 text-teal-200 border-teal-500/40" }
      : status === "offline"
      ? { icon: WifiOff, text: "Realtime Offline", cls: "bg-rose-500/20 text-rose-200 border-rose-500/40" }
      : { icon: Loader2, text: "Connecting…", cls: "bg-slate-700/60 text-slate-200 border-slate-600" };
  const Icon = cfg.icon;
  return (
    <div
      className={`pointer-events-auto inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${cfg.cls}`}
    >
      <Icon className={`size-3 ${status === "connecting" ? "animate-spin" : ""}`} />
      {cfg.text}
    </div>
  );
}

export default Anderoute3DDispatchMap;
