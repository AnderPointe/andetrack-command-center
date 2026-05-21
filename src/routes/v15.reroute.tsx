import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAV_SESSIONS, NAV_EVENTS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/reroute")({
  head: () => ({ meta: [{ title: "V1.5 Reroute & Off-Route · Anderoute" }] }),
  component: Page,
});

function Page() {
  const offRoute = NAV_SESSIONS.filter((s) => s.status === "off_route");
  const rerouting = NAV_SESSIONS.filter((s) => s.status === "rerouting");
  const rerouteEvents = NAV_EVENTS.filter((e) => e.type.startsWith("reroute") || e.type === "off_route_detected");
  return (
    <V15Page
      icon={<Navigation className="size-6 text-cyan-300" />}
      title="Reroute & Off-Route (placeholder)"
      blurb="V1.5 ships a simple off-route detector and a manual reroute button. Full automatic rerouting and native turn-by-turn voice land in V2."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
          {offRoute.length} session{offRoute.length === 1 ? "" : "s"} off-route
        </Card>
        <Card className="border-sky-500/30 bg-sky-500/[0.04] p-3 text-sm text-sky-100/90">
          {rerouting.length} reroute{rerouting.length === 1 ? "" : "s"} in progress
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Reroute history</h2>
        <div className="mt-3 space-y-2 text-sm">
          {rerouteEvents.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <span className="font-mono text-xs text-muted-foreground">{e.sessionId}</span> · {e.type}
                <div className="text-xs text-muted-foreground">{e.detail}</div>
              </div>
              <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{e.at}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Components</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>OffRouteWarning · RerouteButton · RerouteStatusBanner · RerouteHistoryPanel</li>
        </ul>
      </Card>
    </V15Page>
  );
}
