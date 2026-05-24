import { useState } from "react";
import {
  Truck,
  Package,
  Warehouse,
  Building2,
  Users,
  Plane,
  Store,
  Landmark,
  Waves,
  MapPin,
  Box,
  Activity,
  CloudSun,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { DispatchLayerKey } from "./AnderouteDispatchMap";

const LAYERS: Array<{
  key: DispatchLayerKey;
  label: string;
  icon: typeof Truck;
  group: "ops" | "poi" | "world";
  placeholder?: boolean;
}> = [
  { key: "drivers", label: "Drivers", icon: Truck, group: "ops" },
  { key: "loads", label: "Loads", icon: Package, group: "ops" },
  { key: "depots", label: "Depots", icon: Building2, group: "poi" },
  { key: "warehouses", label: "Warehouses", icon: Warehouse, group: "poi" },
  { key: "customers", label: "Customers", icon: Users, group: "poi" },
  { key: "airports", label: "Airports", icon: Plane, group: "poi" },
  { key: "stores", label: "Stores", icon: Store, group: "poi" },
  { key: "landmarks", label: "Landmarks", icon: Landmark, group: "poi" },
  { key: "waterways", label: "Waterways", icon: Waves, group: "poi" },
  { key: "custom_pins", label: "Custom Pins", icon: MapPin, group: "poi" },
  { key: "buildings_3d", label: "3D Buildings", icon: Box, group: "world" },
  { key: "traffic", label: "Traffic", icon: Activity, group: "world", placeholder: true },
  { key: "weather", label: "Weather", icon: CloudSun, group: "world", placeholder: true },
];

interface Props {
  visible: Set<DispatchLayerKey>;
  onToggle: (key: DispatchLayerKey) => void;
}

export function Anderoute3DLayerPanel({ visible, onToggle }: Props) {
  const [open, setOpen] = useState(true);

  const groups: Array<{ id: "ops" | "poi" | "world"; title: string }> = [
    { id: "ops", title: "Operations" },
    { id: "poi", title: "Places" },
    { id: "world", title: "World" },
  ];

  return (
    <div className="absolute right-4 top-4 z-[400] w-56 overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Layers className="size-4 text-teal-600" />
          Map Layers
        </span>
        {open ? (
          <ChevronUp className="size-4 text-slate-500" />
        ) : (
          <ChevronDown className="size-4 text-slate-500" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 px-2 py-2">
          {groups.map((g) => (
            <div key={g.id} className="mb-2 last:mb-0">
              <div className="px-2 pb-1 pt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
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
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition ${
                        on
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <l.icon className="size-3.5" />
                        {l.label}
                      </span>
                      <span
                        className={`flex h-4 w-7 items-center rounded-full p-0.5 transition ${
                          on ? "bg-teal-500 justify-end" : "bg-slate-300 justify-start"
                        }`}
                      >
                        <span className="block size-3 rounded-full bg-white shadow" />
                      </span>
                      {l.placeholder && (
                        <span className="absolute -ml-1 text-[8px] uppercase text-slate-400">
                          soon
                        </span>
                      )}
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

export const DEFAULT_VISIBLE_LAYERS: Set<DispatchLayerKey> = new Set<DispatchLayerKey>([
  "drivers",
  "loads",
  "depots",
  "warehouses",
  "customers",
  "airports",
  "stores",
  "landmarks",
  "waterways",
  "custom_pins",
  "buildings_3d",
]);
