import { ChevronDown } from "lucide-react";
import type { DispatchDriver } from "@/types/dispatch";
import { DriverDispatchCard } from "./DriverDispatchCard";

interface Props {
  drivers: DispatchDriver[];
  totalCount: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCenter: (driver: DispatchDriver) => void;
  onCall: (driver: DispatchDriver) => void;
  connected: boolean;
}

export function FleetDriverList({
  drivers,
  totalCount,
  selectedId,
  onSelect,
  onCenter,
  onCall,
  connected,
}: Props) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <button className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
          Fleet ({drivers.length})
          <ChevronDown className="size-3.5 text-slate-400" />
        </button>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span
            className={`size-1.5 rounded-full ${
              connected ? "animate-pulse bg-emerald-500" : "bg-slate-300"
            }`}
          />
          <span className={connected ? "text-emerald-600" : "text-slate-400"}>
            {connected ? "Live" : "Idle"}
          </span>
          <span className="text-slate-400">· of {totalCount}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {drivers.length === 0 ? (
          <p className="px-4 py-6 text-xs italic text-slate-400">
            No drivers match the current filters.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {drivers.map((d) => (
              <li key={d.driver_id}>
                <DriverDispatchCard
                  driver={d}
                  selected={d.driver_id === selectedId}
                  onSelect={() => onSelect(d.driver_id)}
                  onCenter={() => onCenter(d)}
                  onCall={() => onCall(d)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
