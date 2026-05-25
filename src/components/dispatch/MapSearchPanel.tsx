import { useMemo, useState } from "react";
import { Search, Truck, MapPin, Package, Warehouse, Plane, Store, Landmark, Users } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import type { LogisticsPoi } from "@/types/map";
import { searchMapLocation, type SearchResult } from "@/services/mapSearchService";

interface Props {
  drivers: DispatchDriver[];
  pois: LogisticsPoi[];
  onResult: (r: SearchResult) => void;
}

const KIND_ICON: Record<SearchResult["kind"], typeof Truck> = {
  driver: Truck,
  unit: Truck,
  load: Package,
  poi: MapPin,
  warehouse: Warehouse,
  customer: Users,
  airport: Plane,
  store: Store,
  landmark: Landmark,
  city: MapPin,
  address: MapPin,
  unknown: MapPin,
};

export function MapSearchPanel({ drivers, pois, onResult }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(
    () => searchMapLocation({ query, drivers, pois }),
    [query, drivers, pois],
  );

  return (
    <div className="pointer-events-auto w-80 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Search className="size-4 text-teal-300" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search drivers, units, loads, places..."
          className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-300"
          >
            Clear
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div className="max-h-72 overflow-y-auto border-t border-slate-700/60">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-xs text-slate-500">
              No local matches.
              <div className="mt-1 text-[10px] text-slate-600">
                Geocoding provider not connected yet.
              </div>
            </div>
          ) : (
            results.map((r) => {
              const Icon = KIND_ICON[r.kind];
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    onResult(r);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 border-b border-slate-800/60 px-3 py-2 text-left text-xs hover:bg-slate-800/70"
                >
                  <Icon className="size-3.5 text-teal-300" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-slate-100">{r.label}</div>
                    {r.sublabel && (
                      <div className="truncate text-[10px] text-slate-500">{r.sublabel}</div>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-600">{r.kind}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
