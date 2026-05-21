import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { Progress } from "@/components/ui/progress";
import { NAV_SESSIONS, v15Stats } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/sessions")({
  head: () => ({ meta: [{ title: "V1.5 Navigation Sessions · Anderoute" }] }),
  component: Page,
});

const statusTone: Record<string, string> = {
  active:             "border-emerald-500/30 text-emerald-300",
  navigation_started: "border-emerald-500/30 text-emerald-300",
  route_ready:        "border-sky-500/30 text-sky-300",
  route_requested:    "border-sky-500/30 text-sky-300",
  rerouting:          "border-amber-500/30 text-amber-300",
  off_route:          "border-amber-500/30 text-amber-300",
  paused:             "border-white/15 text-muted-foreground",
  completed:          "border-emerald-500/30 text-emerald-300",
  cancelled:          "border-white/15 text-muted-foreground",
  failed:             "border-rose-500/30 text-rose-300",
  arrived_pickup:     "border-sky-500/30 text-sky-300",
  arrived_dropoff:    "border-emerald-500/30 text-emerald-300",
};

function Page() {
  const s = v15Stats();
  return (
    <V15Page
      icon={<Activity className="size-6 text-cyan-300" />}
      title="Route Session Tracking"
      blurb="navigation_sessions + navigation_events + route_steps. Each session captures provider, geometry, ETA, status, and a full event timeline."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Active" value={s.sessionsActive} tone="info" />
        <StatTile label="Off-route" value={s.offRoute} tone={s.offRoute ? "warn" : "good"} />
        <StatTile label="Total" value={NAV_SESSIONS.length} tone="info" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Sessions</h2>
        <div className="mt-3 space-y-2 text-sm">
          {NAV_SESSIONS.map((sn) => (
            <div key={sn.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-muted-foreground">{sn.id}</span> · {sn.load} · {sn.driver}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{sn.provider}</Badge>
                  <Badge variant="outline" className={statusTone[sn.status]}>{sn.status}</Badge>
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {sn.distanceMi} mi · {sn.durationMin} min · ETA {sn.etaAt} · remaining {sn.remainingMi} mi
              </div>
              <Progress value={sn.progressPct} className="mt-2 h-1.5" />
              {sn.warnings.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sn.warnings.map((w) => (
                    <Badge key={w} variant="outline" className="border-amber-500/30 text-xs text-amber-300">{w}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
