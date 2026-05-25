import { X, Phone, MessageCircle, MapPin, Truck, Globe, Plus, Shield, Building2 } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi } from "@/types/map";
import type { MapGeofence } from "@/hooks/useMapGeofences";
import { DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "./dispatchTokens";

type Selected =
  | { type: "driver"; driver: DispatchDriver }
  | { type: "poi"; poi: LogisticsPoi & { address?: string; city?: string; state?: string; phone?: string; website?: string; description?: string } }
  | { type: "geofence"; geofence: MapGeofence };

interface Props {
  selected: Selected;
  onClose: () => void;
  onCall?: () => void;
  onMessage?: () => void;
  onAssignLoad?: () => void;
  onAddStop?: () => void;
  onEditZone?: () => void;
}

export function SelectedMapObjectCard({
  selected,
  onClose,
  onCall,
  onMessage,
  onAssignLoad,
  onAddStop,
  onEditZone,
}: Props) {
  return (
    <div className="pointer-events-auto w-80 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-700/60 px-3 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
          {selected.type === "driver" ? "Driver" : selected.type === "poi" ? "Place" : "Geofence"}
        </span>
        <button
          onClick={onClose}
          className="grid size-6 place-items-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {selected.type === "driver" && (
        <DriverBody driver={selected.driver} onCall={onCall} onMessage={onMessage} onAssignLoad={onAssignLoad} />
      )}
      {selected.type === "poi" && <PoiBody poi={selected.poi} onAddStop={onAddStop} onAssignLoad={onAssignLoad} />}
      {selected.type === "geofence" && <GeofenceBody geofence={selected.geofence} onEditZone={onEditZone} />}
    </div>
  );
}

function DriverBody({
  driver,
  onCall,
  onMessage,
  onAssignLoad,
}: {
  driver: DispatchDriver;
  onCall?: () => void;
  onMessage?: () => void;
  onAssignLoad?: () => void;
}) {
  const color = DRIVER_STATUS_COLOR[driver.status];
  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="grid size-12 place-items-center rounded-full text-sm font-bold text-slate-900"
          style={{ background: color }}
        >
          {(driver.driver_name ?? "??").split(" ").map((s) => s[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{driver.driver_name}</div>
          <div className="text-[11px] text-slate-400">
            Unit {driver.unit_number ?? "—"} · {driver.vehicle_type ?? "—"}
          </div>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: `${color}26`, color }}
        >
          {DRIVER_STATUS_LABEL[driver.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-700/60 px-4 py-3 text-[11px]">
        <Stat label="Speed" value={`${Math.round(driver.speed_mph ?? 0)} mph`} />
        <Stat label="ETA" value={driver.eta_minutes != null ? `${driver.eta_minutes} min` : "—"} />
        <Stat label="Load" value={driver.current_load_number ? `#${driver.current_load_number}` : "—"} />
        <Stat label="Heading" value={`${Math.round((driver as any).heading ?? 0)}°`} />
        <Stat label="Battery" value={`${(driver as any).battery_pct ?? "—"}${(driver as any).battery_pct != null ? "%" : ""}`} />
        <Stat label="Signal" value={(driver as any).signal ?? "live"} />
      </div>

      <div className="flex gap-2 border-t border-slate-700/60 bg-slate-950/50 p-3">
        <button
          onClick={onMessage}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-100 hover:border-teal-500 hover:text-teal-300"
        >
          <MessageCircle className="size-3.5" /> Message
        </button>
        <button
          onClick={onCall}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-500 text-xs font-medium text-white hover:bg-teal-400"
        >
          <Phone className="size-3.5" /> Call
        </button>
      </div>
      <button
        onClick={onAssignLoad}
        className="block w-full border-t border-slate-700/60 bg-slate-900 py-2.5 text-center text-xs font-semibold text-orange-400 hover:bg-orange-500/10"
      >
        Assign Load →
      </button>
    </>
  );
}

function PoiBody({
  poi,
  onAddStop,
  onAssignLoad,
}: {
  poi: any;
  onAddStop?: () => void;
  onAssignLoad?: () => void;
}) {
  return (
    <>
      <div className="px-4 py-3">
        <div className="flex items-start gap-2">
          <Building2 className="mt-0.5 size-4 text-teal-300" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-100">{poi.name}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              {String(poi.category).replace(/_/g, " ")}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-[11px] text-slate-300">
          {poi.address && (
            <div className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 size-3 text-slate-500" />
              <span>{[poi.address, poi.city, poi.state].filter(Boolean).join(", ")}</span>
            </div>
          )}
          {poi.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="size-3 text-slate-500" />
              <span>{poi.phone}</span>
            </div>
          )}
          {poi.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="size-3 text-slate-500" />
              <span className="truncate">{poi.website}</span>
            </div>
          )}
          {poi.description && <div className="text-slate-400">{poi.description}</div>}
          <div className="text-[10px] text-slate-600">
            {poi.latitude.toFixed(4)}, {poi.longitude.toFixed(4)}
          </div>
        </div>
      </div>
      <div className="flex gap-2 border-t border-slate-700/60 bg-slate-950/50 p-3">
        <button
          onClick={onAddStop}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-100 hover:border-teal-500 hover:text-teal-300"
        >
          <Plus className="size-3.5" /> Add Stop
        </button>
        <button
          onClick={onAssignLoad}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange-500 text-xs font-medium text-white hover:bg-orange-400"
        >
          <Truck className="size-3.5" /> Assign Load
        </button>
      </div>
    </>
  );
}

function GeofenceBody({ geofence, onEditZone }: { geofence: MapGeofence; onEditZone?: () => void }) {
  return (
    <>
      <div className="px-4 py-3">
        <div className="flex items-start gap-2">
          <Shield className="mt-0.5 size-4 text-teal-300" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-slate-100">{geofence.name}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              {geofence.type} · {geofence.status}
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <Stat label="Radius" value={`${Math.round(geofence.radius_m).toLocaleString()} m`} />
          <Stat label="Center" value={`${geofence.center[1].toFixed(3)}, ${geofence.center[0].toFixed(3)}`} />
        </div>
        {geofence.notes && <div className="mt-2 text-[11px] text-slate-400">{geofence.notes}</div>}
      </div>
      <div className="flex gap-2 border-t border-slate-700/60 bg-slate-950/50 p-3">
        <button
          onClick={onEditZone}
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-100 hover:border-teal-500 hover:text-teal-300"
        >
          Edit Zone
        </button>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-800/40 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="truncate text-slate-100">{value}</div>
    </div>
  );
}
