import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { DRIVER_NAV, NAV_EVENTS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/driver-nav")({
  head: () => ({ meta: [{ title: "V1.5 Driver Navigation · Anderoute" }] }),
  component: Page,
});

const confTone: Record<string, string> = {
  high:   "border-emerald-500/30 text-emerald-300",
  medium: "border-sky-500/30 text-sky-300",
  low:    "border-amber-500/30 text-amber-300",
  stale:  "border-rose-500/30 text-rose-300",
};

function Page() {
  const d = DRIVER_NAV;
  const timeline = NAV_EVENTS.filter((e) => e.sessionId === "ns-501");
  return (
    <V15Page
      icon={<Truck className="size-6 text-cyan-300" />}
      title="Driver Navigation V1.5"
      blurb="Larger active-driving mode, provider badge, ETA confidence, route status, reroute button, error banner, and a clean event timeline. Real geometry when the provider delivers it."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Provider" value={d.provider} tone="info" />
        <StatTile label="Remaining" value={`${d.remainingMi} mi`} tone="info" />
        <StatTile label="ETA" value={d.etaAt} tone="info" />
        <StatTile label="Confidence" value={d.etaConfidence} tone={d.etaConfidence === "high" ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{d.nextManeuver}</div>
            <div className="mt-1 text-xs text-muted-foreground">Driver: {d.driver} · Load {d.load}</div>
          </div>
          <Badge variant="outline" className={confTone[d.etaConfidence]}>ETA {d.etaConfidence}</Badge>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Navigation event timeline</h2>
        <div className="mt-3 space-y-2 text-sm">
          {timeline.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div>{e.type}</div>
                <div className="text-xs text-muted-foreground">{e.detail}</div>
              </div>
              <span className="text-xs text-muted-foreground">{e.at}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Components</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["DriverNavigationV15", "DriverRouteSummary", "DriverNavigationStatus", "ActiveDrivingMode", "DriverRouteErrorBanner", "DriverRerouteButton", "DriverNavigationEventTimeline"].map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-xs">{c}</Badge>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
