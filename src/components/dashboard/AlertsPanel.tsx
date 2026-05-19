import { alerts } from "@/data/mock";
import type { AlertSeverity } from "@/types";
import { AlertTriangle, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const severityColor: Record<AlertSeverity, string> = {
  low: "var(--info)",
  medium: "var(--warning)",
  high: "var(--orange)",
  critical: "var(--destructive)",
};

export function AlertsPanel({ limit }: { limit?: number }) {
  const items = alerts.filter((a) => !a.resolved).slice(0, limit);
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <AlertTriangle className="size-4 text-orange" /> Alerts & Exceptions
        </h3>
        <span className="text-xs text-muted-foreground">{items.length} open</span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((a) => (
          <li key={a.id} className="p-4">
            <div className="flex items-start gap-3">
              <span
                className="mt-1 size-2 rounded-full shrink-0"
                style={{ backgroundColor: severityColor[a.severity] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{a.type}</span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        color: severityColor[a.severity],
                        backgroundColor: `color-mix(in oklab, ${severityColor[a.severity]} 12%, transparent)`,
                      }}
                    >
                      {a.severity}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{a.createdAt}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-1">{a.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-foreground/80 font-medium">Action: </span>
                  {a.recommendedAction}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs">
                    <Phone className="size-3" /> Contact
                  </Button>
                  <Button size="sm" className="h-7 gap-1.5 text-xs bg-teal text-teal-foreground hover:bg-teal/90">
                    <Check className="size-3" /> Resolve
                  </Button>
                  {a.driverId && (
                    <span className="ml-auto text-[11px] text-muted-foreground">
                      {a.driverId}{a.loadId ? ` · ${a.loadId}` : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
