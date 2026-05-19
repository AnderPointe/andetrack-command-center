import { Activity, Truck, CheckCircle2, MapPin, Bell } from "lucide-react";

const events = [
  { icon: CheckCircle2, color: "var(--success)", text: "DRV-009 delivered LD-1009 in Memphis, TN", time: "2 min" },
  { icon: Truck, color: "var(--teal)", text: "DRV-007 accepted LD-1007 (Denver → SLC)", time: "5 min" },
  { icon: MapPin, color: "var(--status-pickup)", text: "DRV-003 arrived at pickup · BuildCorp ATL", time: "8 min" },
  { icon: Bell, color: "var(--destructive)", text: "Alert: DRV-005 delayed 47 min on I-95 N", time: "11 min" },
  { icon: Activity, color: "var(--orange)", text: "DRV-002 loaded LD-1002 · Reefer at -4°F", time: "16 min" },
  { icon: Truck, color: "var(--teal)", text: "DRV-008 offered LD-1008 · awaiting response", time: "21 min" },
  { icon: CheckCircle2, color: "var(--success)", text: "Dispatcher L. Howard assigned LD-1001", time: "34 min" },
];

export function EventFeed() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Activity className="size-4 text-teal" /> Real-Time Activity
        </h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success animate-pulse" /> Live
        </span>
      </div>
      <ul className="p-2 max-h-[420px] overflow-y-auto">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <li key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-secondary/50">
              <div
                className="size-7 rounded-md grid place-items-center shrink-0"
                style={{
                  backgroundColor: `color-mix(in oklab, ${e.color} 14%, transparent)`,
                  color: e.color,
                }}
              >
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">{e.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{e.time} ago</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
