import { Package } from "lucide-react";
import { LoadDispatchCard } from "./LoadDispatchCard";
import type { DispatchLoad } from "@/types/loads";

interface Props {
  loads: DispatchLoad[];
  selectedLoadId: string | null;
  onSelect: (load: DispatchLoad) => void;
  onFocus: (load: DispatchLoad) => void;
  usingMock?: boolean;
}

export function LoadsDispatchPanel({
  loads,
  selectedLoadId,
  onSelect,
  onFocus,
  usingMock,
}: Props) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-l border-slate-200 bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-slate-900 text-white">
            <Package className="size-3.5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Loads</div>
            <div className="text-[11px] text-slate-500">
              {loads.length} active{usingMock ? " · demo data" : ""}
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {loads.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
            No loads match the current filters.
          </div>
        )}
        {loads.map((load) => (
          <LoadDispatchCard
            key={load.id}
            load={load}
            selected={load.id === selectedLoadId}
            onSelect={onSelect}
            onFocus={onFocus}
          />
        ))}
      </div>
    </aside>
  );
}
