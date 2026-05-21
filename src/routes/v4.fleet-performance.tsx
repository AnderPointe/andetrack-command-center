import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FLEET_PERF } from "@/v4/data/mockPhase21";

const GROUPS = {
  "Drivers":     ["drivers_total","drivers_active","drivers_offline","drivers_stale_gps"],
  "Fleet & loads":["vehicles_total","active_loads"],
  "Realtime":    ["realtime_health","gps_events_per_min"],
  "Performance": ["map_render_p95_ms","api_p95_ms","db_p95_ms"],
  "Pipelines":   ["webhooks_per_min","notifications_per_min"],
} as const;

export const Route = createFileRoute("/v4/fleet-performance")({
  head: () => ({ meta: [{ title: "Large Fleet Performance · Anderoute" }] }),
  component: () => {
    const f = FLEET_PERF as Record<string, number>;
    const gpsStale = ((f.drivers_stale_gps / f.drivers_total) * 100);
    return (
      <V4Page icon={<Gauge className="size-6 text-sky-300" />} title="Large-Fleet Performance"
        blurb="Driver, vehicle, realtime, map, API, DB, webhook and notification health at national scale.">
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">Realtime health</div>
            <div className="mt-1 text-3xl font-semibold">{f.realtime_health}%</div>
            <Progress value={f.realtime_health} className="mt-2 h-1.5" />
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">GPS staleness</div>
            <div className="mt-1 text-3xl font-semibold">{gpsStale.toFixed(2)}%</div>
            <div className="mt-1 text-xs text-muted-foreground">{f.drivers_stale_gps} of {f.drivers_total} drivers</div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <div className="text-xs uppercase text-muted-foreground">API p95</div>
            <div className="mt-1 text-3xl font-semibold">{f.api_p95_ms}ms</div>
            <div className="mt-1 text-xs text-muted-foreground">DB p95 {f.db_p95_ms}ms · Map p95 {f.map_render_p95_ms}ms</div>
          </Card>
        </div>
        {Object.entries(GROUPS).map(([label, keys]) => (
          <Card key={label} className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">{label}</h3>
            <div className="mt-2 grid gap-2 md:grid-cols-4">
              {keys.map(k => (
                <div key={k} className="rounded border border-white/10 bg-black/20 p-2">
                  <div className="text-[10px] uppercase text-muted-foreground">{k.replace(/_/g," ")}</div>
                  <div className="mt-1 text-lg font-semibold">{f[k as string].toLocaleString()}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </V4Page>
    );
  },
});
