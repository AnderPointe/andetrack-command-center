import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAV_EVENTS, ROUTE_RENDER_LAYERS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/rendering")({
  head: () => ({ meta: [{ title: "V1.5 Route Rendering · Anderoute" }] }),
  component: Page,
});

const toneClass: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  warn: "border-amber-500/30 text-amber-300",
  bad:  "border-rose-500/30 text-rose-300",
  info: "border-sky-500/30 text-sky-300",
};

function Page() {
  return (
    <V15Page
      icon={<RouteIcon className="size-6 text-cyan-300" />}
      title="Route Rendering"
      blurb="Real geometry on dispatcher + driver maps when the provider delivers it, mock geometry as a clean fallback. Provider badge, status badge, and a live event timeline are always visible."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Components</h2>
        <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-2">
          <li>· RouteLineRenderer</li>
          <li>· RouteProviderBadge</li>
          <li>· RouteStatusBadge</li>
          <li>· RouteLoadingOverlay</li>
          <li>· RouteErrorState</li>
          <li>· RouteEventTimeline</li>
          <li>· DispatcherRouteOverlay</li>
          <li>· DriverRoutePanel</li>
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Live event timeline</h2>
        <div className="mt-3 space-y-2 text-sm">
          {NAV_EVENTS.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <span className="font-mono text-xs text-muted-foreground">{e.sessionId}</span> · {e.type}
                <div className="text-xs text-muted-foreground">{e.detail}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{e.at}</span>
                <Badge variant="outline" className={toneClass[e.tone] ?? "border-white/15 text-muted-foreground"}>{e.tone}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
