import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NAV_PROVIDERS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/navigation")({
  head: () => ({ meta: [{ title: "V1.1 Navigation SDK Readiness · Anderoute" }] }),
  component: Page,
});

function check(v: boolean) {
  return v ? <span className="text-emerald-300">✓</span> : <span className="text-rose-300">✕</span>;
}

function Page() {
  return (
    <V11Page
      icon={<Map className="size-6 text-fuchsia-300" />}
      title="Navigation SDK Readiness"
      blurb="Per-provider readiness for token, mobile SDK, web map, route test, turn-by-turn, reroute, ETA sync, truck routing, and cost warnings. Mock fallback always retained."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-2">Provider</th>
              <th className="p-2">Token</th>
              <th className="p-2">Mobile SDK</th>
              <th className="p-2">Web map</th>
              <th className="p-2">Route</th>
              <th className="p-2">TBT</th>
              <th className="p-2">Reroute</th>
              <th className="p-2">ETA sync</th>
              <th className="p-2">Truck</th>
              <th className="p-2">Cost note</th>
            </tr>
          </thead>
          <tbody>
            {NAV_PROVIDERS.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-2 font-medium">{p.label}</td>
                <td className="p-2">{check(p.tokenConfigured)}</td>
                <td className="p-2">{check(p.mobileSdkReady)}</td>
                <td className="p-2">{check(p.webMapReady)}</td>
                <td className="p-2">{check(p.routeTest)}</td>
                <td className="p-2">{check(p.turnByTurnTest)}</td>
                <td className="p-2">{check(p.rerouteTest)}</td>
                <td className="p-2">{check(p.etaSyncTest)}</td>
                <td className="p-2">{check(p.truckRouting)}</td>
                <td className="p-2 text-xs text-muted-foreground">{p.costNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Cost warning</Badge>
        <p className="mt-2 text-amber-100/90">
          Real navigation providers bill per request. Configure a hard monthly cap
          and per-driver session limits before activating in production.
        </p>
      </Card>
    </V11Page>
  );
}
