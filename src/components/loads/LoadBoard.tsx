import { loads, drivers } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Truck, Clock, DollarSign, ShieldAlert } from "lucide-react";
import { DriverStatusBadge } from "@/components/drivers/DriverStatusBadge";
import { Link } from "@tanstack/react-router";

export function LoadBoard() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Active Load Board</h3>
        <Link to="/loads" className="text-xs text-teal hover:underline">View all loads →</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-surface-2/60">
            <tr>
              <th className="text-left font-medium px-4 py-2.5">Load</th>
              <th className="text-left font-medium px-4 py-2.5">Route</th>
              <th className="text-left font-medium px-4 py-2.5">Driver</th>
              <th className="text-left font-medium px-4 py-2.5">Vehicle</th>
              <th className="text-left font-medium px-4 py-2.5">ETA</th>
              <th className="text-right font-medium px-4 py-2.5">Rate</th>
              <th className="text-right font-medium px-4 py-2.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loads.map((l) => {
              const driver = drivers.find((d) => d.id === l.assignedDriverId);
              return (
                <tr key={l.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{l.id}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Package className="size-3" /> {l.commodity}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="size-3 text-teal" /> {l.pickupLocation}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3 text-orange" /> {l.dropoffLocation}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {driver ? (
                      <div>
                        <div className="text-sm">{driver.name}</div>
                        <div className="mt-0.5"><DriverStatusBadge status={driver.status} size="xs" /></div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs flex items-center gap-1.5">
                      <Truck className="size-3" /> {l.requiredVehicleType}
                    </div>
                    {l.requiresCDL && (
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-orange">
                        <ShieldAlert className="size-3" /> CDL
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs flex items-center gap-1">
                      <Clock className="size-3" /> {l.estimatedDuration}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{l.estimatedMiles} mi</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="font-medium tabular-nums inline-flex items-center gap-0.5">
                      <DollarSign className="size-3" />{l.rate.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {driver ? "Track" : "Assign"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
