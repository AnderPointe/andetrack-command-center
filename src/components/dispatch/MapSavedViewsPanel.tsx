import { Bookmark } from "lucide-react";
import type { SavedMapView } from "@/hooks/useMapSavedViews";

interface Props {
  views: SavedMapView[];
  onApply: (v: SavedMapView) => void;
}

export function MapSavedViewsPanel({ views, onApply }: Props) {
  return (
    <div className="pointer-events-auto w-64 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-slate-700/60 px-3 py-2.5">
        <Bookmark className="size-4 text-teal-300" />
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Saved Views</span>
      </div>
      <div className="max-h-72 overflow-y-auto p-2">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => onApply(v)}
            className="flex w-full flex-col items-start gap-0.5 rounded-lg px-2 py-1.5 text-left text-xs text-slate-200 hover:bg-slate-800"
          >
            <span className="font-medium">{v.label}</span>
            {v.description && (
              <span className="text-[10px] text-slate-500">{v.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
