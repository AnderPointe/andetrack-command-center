import { drivers, statusMeta } from "@/data/mock";
import type { DriverStatus } from "@/types";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { Clock, Gauge, GripVertical } from "lucide-react";

const columns: DriverStatus[] = [
  "waiting",
  "offered",
  "accepted",
  "pickup",
  "loaded",
  "transit",
  "break",
  "delayed",
  "delivered",
  "offduty",
];

export function DispatchStatusBoard() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 pb-2">
      <div className="flex gap-3 min-w-max">
        {columns.map((status) => {
          const list = drivers.filter((d) => d.status === status);
          const color = `var(--${statusMeta[status].token})`;
          return (
            <div key={status} className="w-72 shrink-0 rounded-xl border border-border bg-surface-2/60">
              <div className="px-3 py-2.5 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium">{statusMeta[status].label}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{list.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[120px]">
                {list.map((d) => (
                  <div
                    key={d.id}
                    className="group rounded-lg border border-border bg-card p-3 hover:shadow-sm hover:border-teal/40 transition cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="size-3.5 text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium truncate">{d.name}</span>
                          <span className="text-[10px] text-muted-foreground">{d.lastUpdated}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{d.vehicleType}</span>
                          {d.currentLoadId && <span>· {d.currentLoadId}</span>}
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <DriverStatusBadge status={d.status} size="xs" />
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1"><Gauge className="size-3" />{d.currentSpeed}</span>
                            <span className="inline-flex items-center gap-1"><Clock className="size-3" />{d.eta ?? "—"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {list.length === 0 && (
                  <div className="text-[11px] text-muted-foreground text-center py-6">No drivers</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
