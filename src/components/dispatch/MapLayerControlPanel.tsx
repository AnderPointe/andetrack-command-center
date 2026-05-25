import { useState } from "react";
import {
  Truck, Package, MapPin, ArrowDownToLine, Building2, Warehouse, Users,
  Fuel, Wrench, Plane, Anchor, Train, Store, Landmark, Waves, Droplet,
  Pin, Shield, Box, Activity, CloudSun, Layers, ChevronDown, ChevronUp,
} from "lucide-react";
import type { DispatchLayerKey } from "./AnderouteDispatchMap";

type LayerDef = {
  key: DispatchLayerKey;
  label: string;
  icon: typeof Truck;
  group: "ops" | "places" | "world" | "overlay";
  placeholder?: boolean;
};

const LAYERS: LayerDef[] = [
  { key: "drivers", label: "Drivers", icon: Truck, group: "ops" },
  { key: "loads", label: "Loads", icon: Package, group: "ops" },
  { key: "pickups", label: "Pickups", icon: MapPin, group: "ops" },
  { key: "dropoffs", label: "Drop-offs", icon: ArrowDownToLine, group: "ops" },

  { key: "depots", label: "Depots", icon: Building2, group: "places" },
  { key: "warehouses", label: "Warehouses", icon: Warehouse, group: "places" },
  { key: "customers", label: "Customers", icon: Users, group: "places" },
  { key: "truck_stops", label: "Truck Stops", icon: Truck, group: "places" },
  { key: "fuel", label: "Fuel", icon: Fuel, group: "places" },
  { key: "maintenance", label: "Maintenance", icon: Wrench, group: "places" },
  { key: "airports", label: "Airports", icon: Plane, group: "places" },
  { key: "ports", label: "Ports", icon: Anchor, group: "places" },
  { key: "rail_yards", label: "Rail Yards", icon: Train, group: "places" },
  { key: "stores", label: "Stores", icon: Store, group: "places" },
  { key: "landmarks", label: "Landmarks", icon: Landmark, group: "places" },

  { key: "lakes", label: "Lakes", icon: Waves, group: "world" },
  { key: "rivers", label: "Rivers", icon: Droplet, group: "world" },
  { key: "custom_pins", label: "Custom Pins", icon: Pin, group: "overlay" },
  { key: "geofences", label: "Geofences", icon: Shield, group: "overlay" },
  { key: "buildings_3d", label: "3D Buildings", icon: Box, group: "world" },
  { key: "traffic", label: "Traffic", icon: Activity, group: "overlay", placeholder: true },
  { key: "weather", label: "Weather", icon: CloudSun, group: "overlay", placeholder: true },
];

const GROUPS: Array<{ id: LayerDef["group"]; title: string }> = [
  { id: "ops", title: "Operations" },
  { id: "places", title: "Places" },
  { id: "world", title: "World" },
  { id: "overlay", title: "Overlays" },
];

interface Props {
  visible: Set<DispatchLayerKey>;
  onToggle: (key: DispatchLayerKey) => void;
}

export function MapLayerControlPanel({ visible, onToggle }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="pointer-events-auto w-64 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-300">
          <Layers className="size-4" />
          Map Layers
        </span>
        {open ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
      </button>

      {open && (
        <div className="max-h-[55vh] overflow-y-auto border-t border-slate-700/60 px-2 py-2">
          {GROUPS.map((g) => (
            <div key={g.id} className="mb-2 last:mb-0">
              <div className="px-2 pb-1 pt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {g.title}
              </div>
              <div className="space-y-0.5">
                {LAYERS.filter((l) => l.group === g.id).map((l) => {
                  const on = visible.has(l.key);
                  return (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => onToggle(l.key)}
                      className={`group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition ${
                        on ? "bg-teal-500/15 text-teal-100" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <l.icon className={`size-3.5 ${on ? "text-teal-300" : "text-slate-400"}`} />
                        {l.label}
                        {l.placeholder && (
                          <span className="rounded bg-slate-700 px-1 text-[8px] uppercase text-slate-300">soon</span>
                        )}
                      </span>
                      <span
                        className={`flex h-4 w-7 items-center rounded-full p-0.5 transition ${
                          on ? "justify-end bg-teal-500" : "justify-start bg-slate-700"
                        }`}
                      >
                        <span className="block size-3 rounded-full bg-white shadow" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
