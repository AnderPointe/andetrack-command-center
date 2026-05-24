import { ALL_DRIVER_STATUSES, DRIVER_STATUS_COLOR, DRIVER_STATUS_LABEL } from "./dispatchTokens";

export function MapStatusLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Driver Status
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {ALL_DRIVER_STATUSES.map((s) => (
          <div key={s} className="flex items-center gap-1.5 text-[11px] text-slate-700">
            <span
              className="size-2.5 rounded-full"
              style={{ background: DRIVER_STATUS_COLOR[s] }}
            />
            {DRIVER_STATUS_LABEL[s]}
          </div>
        ))}
      </div>
    </div>
  );
}
