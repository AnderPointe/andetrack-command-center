import { loads, drivers } from "@/data/mock";
import { Button } from "@/components/ui/button";
import {
  MapPin, Package, Truck, Clock, ShieldAlert, ShieldCheck, ArrowRight,
  Snowflake, Flame, MoreHorizontal, Inbox,
} from "lucide-react";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const commodityIcon = (c: string) => {
  const x = c.toLowerCase();
  if (x.includes("frozen") || x.includes("reefer") || x.includes("cold") || x.includes("pharma")) return Snowflake;
  if (x.includes("hazmat") || x.includes("fuel")) return Flame;
  return Package;
};

export function LoadBoard() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-sm)]">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Active Load Board</h3>
          <p className="text-[11px] text-muted-foreground">Live loads tendered, in-transit and pending POD</p>
        </div>
        <Link to="/loads" className="text-xs text-teal font-medium hover:underline inline-flex items-center gap-1">
          View all <ArrowRight className="size-3" />
        </Link>
      </div>

      {loads.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="divide-y divide-border">
          {loads.map((l) => {
            const driver = drivers.find((d) => d.id === l.assignedDriverId);
            const CIcon = commodityIcon(l.commodity);
            return (
              <li key={l.id} className="group hover:bg-secondary/30 transition-colors">
                <div className="px-4 py-3.5 grid grid-cols-12 gap-3 items-center">
                  {/* ID + commodity */}
                  <div className="col-span-12 md:col-span-3 flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-lg bg-gradient-to-br from-teal/15 to-orange/15 border border-border grid place-items-center text-teal shrink-0">
                      <CIcon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm tabular-nums">{l.id}</span>
                        {l.requiresCDL && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-orange bg-orange/10 px-1.5 py-0.5 rounded">
                            <ShieldAlert className="size-2.5" /> CDL
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{l.customer} · {l.commodity}</div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center pt-0.5">
                        <span className="size-1.5 rounded-full bg-teal" />
                        <span className="w-px h-3 bg-border my-0.5" />
                        <span className="size-1.5 rounded-full bg-orange" />
                      </div>
                      <div className="flex-1 min-w-0 leading-tight">
                        <div className="text-[13px] truncate">{l.pickupLocation}</div>
                        <div className="text-[13px] text-muted-foreground truncate">{l.dropoffLocation}</div>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><MapPin className="size-2.5" />{l.estimatedMiles} mi</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-2.5" />{l.estimatedDuration}</span>
                      <span className="inline-flex items-center gap-1"><Truck className="size-2.5" />{l.requiredVehicleType}</span>
                    </div>
                  </div>

                  {/* Driver */}
                  <div className="col-span-7 md:col-span-3">
                    {driver ? (
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-full bg-gradient-to-br from-teal to-orange grid place-items-center text-white text-[10px] font-semibold shrink-0">
                          {driver.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium truncate leading-tight">{driver.name}</div>
                          <div className="mt-0.5"><DriverStatusBadge status={driver.status} size="xs" /></div>
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground rounded-md border border-dashed border-border px-2 py-1">
                        <ShieldCheck className="size-3" /> Unassigned
                      </div>
                    )}
                  </div>

                  {/* Rate + action */}
                  <div className="col-span-5 md:col-span-2 flex items-center justify-end gap-2">
                    <div className="text-right">
                      <div className="text-sm font-semibold tabular-nums">${l.rate.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground tabular-nums">
                        ${(l.rate / Math.max(l.estimatedMiles, 1)).toFixed(2)}/mi
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "h-8 text-xs gap-1 opacity-90 group-hover:opacity-100 transition",
                        !driver && "border-teal/40 text-teal hover:bg-teal/10",
                      )}
                    >
                      {driver ? "Track" : "Assign"} <ArrowRight className="size-3" />
                    </Button>
                    <button className="hidden md:grid size-8 place-items-center rounded-md hover:bg-secondary text-muted-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto size-12 rounded-full bg-secondary grid place-items-center text-muted-foreground">
        <Inbox className="size-5" />
      </div>
      <div className="mt-3 text-sm font-medium">No active loads</div>
      <div className="text-xs text-muted-foreground mt-1">Tendered loads will appear here in real time.</div>
    </div>
  );
}
