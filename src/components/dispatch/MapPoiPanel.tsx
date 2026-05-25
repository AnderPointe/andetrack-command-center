import { useMemo, useState } from "react";
import { MapPinned, Search } from "lucide-react";
import type { LogisticsPoi, PoiCategory } from "@/types/map";

const CATEGORY_LABEL: Record<PoiCategory, string> = {
  depot: "Depots",
  warehouse: "Warehouses",
  customer: "Customers",
  truck_stop: "Truck Stops",
  fuel: "Fuel",
  maintenance: "Maintenance",
  airport: "Airports",
  port: "Ports",
  rail_yard: "Rail Yards",
  store: "Stores",
  landmark: "Landmarks",
  water: "Water",
  load_pickup: "Pickups",
  load_dropoff: "Drop-offs",
  custom: "Custom",
};

const CATEGORY_DOT: Record<PoiCategory, string> = {
  depot: "bg-teal-400",
  warehouse: "bg-slate-400",
  customer: "bg-teal-300",
  truck_stop: "bg-orange-400",
  fuel: "bg-amber-400",
  maintenance: "bg-rose-400",
  airport: "bg-sky-400",
  port: "bg-cyan-400",
  rail_yard: "bg-violet-400",
  store: "bg-emerald-400",
  landmark: "bg-fuchsia-400",
  water: "bg-blue-400",
  load_pickup: "bg-orange-500",
  load_dropoff: "bg-teal-500",
  custom: "bg-slate-200",
};

interface Props {
  pois: LogisticsPoi[];
  onFocus: (poi: LogisticsPoi) => void;
}

export function MapPoiPanel({ pois, onFocus }: Props) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<PoiCategory | "all">("all");

  const counts = useMemo(() => {
    const m = new Map<PoiCategory, number>();
    for (const p of pois) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [pois]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pois.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q);
    });
  }, [pois, cat, query]);

  return (
    <div className="pointer-events-auto w-72 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-slate-700/60 px-3 py-2.5">
        <MapPinned className="size-4 text-teal-300" />
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Logistics POIs</span>
        <span className="ml-auto text-[10px] text-slate-500">{pois.length} total</span>
      </div>

      <div className="border-b border-slate-700/60 p-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter POIs..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 py-1.5 pl-7 pr-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <Chip on={cat === "all"} onClick={() => setCat("all")} label="All" />
          {[...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([c, n]) => (
              <Chip
                key={c}
                on={cat === c}
                onClick={() => setCat(c)}
                label={`${CATEGORY_LABEL[c]} ${n}`}
                dotClass={CATEGORY_DOT[c]}
              />
            ))}
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto">
        {list.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-slate-500">No POIs match.</div>
        ) : (
          list.map((p) => (
            <button
              key={p.id}
              onClick={() => onFocus(p)}
              className="flex w-full items-center gap-2 border-b border-slate-800/60 px-3 py-2 text-left text-xs hover:bg-slate-800/70"
            >
              <span className={`size-2 rounded-full ${CATEGORY_DOT[p.category]}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-slate-100">{p.name}</div>
                <div className="truncate text-[10px] uppercase tracking-wider text-slate-500">
                  {CATEGORY_LABEL[p.category]}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  label,
  dotClass,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  dotClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition ${
        on ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {dotClass && <span className={`size-1.5 rounded-full ${dotClass}`} />}
      {label}
    </button>
  );
}
