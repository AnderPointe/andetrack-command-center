import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAV_PROVIDERS, NAV_INTERFACE_METHODS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/navigation")({
  head: () => ({ meta: [{ title: "V1.5 Navigation Providers · Anderoute" }] }),
  component: Page,
});

const statusTone: Record<string, string> = {
  ready: "border-emerald-500/30 text-emerald-300",
  boundary: "border-sky-500/30 text-sky-300",
  placeholder: "border-amber-500/30 text-amber-300",
  fallback: "border-fuchsia-500/30 text-fuchsia-300",
};

function Cell({ ok }: { ok: boolean }) {
  return <span className={ok ? "text-emerald-300" : "text-muted-foreground"}>{ok ? "✓" : "—"}</span>;
}

function Page() {
  return (
    <V15Page
      icon={<Map className="size-6 text-cyan-300" />}
      title="Navigation Provider Abstraction"
      blurb="One NavigationProvider interface — mock, Mapbox, Google, HERE, and Trimble plug in behind it. Mock always available as fallback. Truck-routing providers stay placeholder until a real pilot demands them."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Provider matrix</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-2">Provider</th>
                <th className="p-2">Status</th>
                <th className="p-2">Token</th>
                <th className="p-2">Route req</th>
                <th className="p-2">Render</th>
                <th className="p-2">ETA</th>
                <th className="p-2">Reroute</th>
                <th className="p-2">Truck</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {NAV_PROVIDERS.map((p) => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="p-2 font-medium">{p.name}</td>
                  <td className="p-2"><Badge variant="outline" className={statusTone[p.status]}>{p.status}</Badge></td>
                  <td className="p-2"><Cell ok={p.tokenConfigured} /></td>
                  <td className="p-2"><Cell ok={p.routeRequests} /></td>
                  <td className="p-2"><Cell ok={p.routeRender} /></td>
                  <td className="p-2"><Cell ok={p.etaParsing} /></td>
                  <td className="p-2"><Cell ok={p.rerouteSupport} /></td>
                  <td className="p-2"><Cell ok={p.truckRouting} /></td>
                  <td className="p-2 text-xs text-muted-foreground">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">NavigationProvider interface</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-xs">{`interface NavigationProvider {
  initialize(): Promise<void>;
  requestRoute(req: RouteRequest): Promise<RouteResponse>;
  renderRoute(map: unknown, route: RouteResponse): void;
  startSession / stopSession / pauseSession / resumeSession;
  getETA(); getRemainingDistance(); getRouteGeometry(); getRouteSteps();
  subscribeToRouteUpdates / LocationUpdates / NavigationEvents;
  validateProviderConfig(); testProviderConnection();
}`}</pre>
      </Card>
    </V15Page>
  );
}
