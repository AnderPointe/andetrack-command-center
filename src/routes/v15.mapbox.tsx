import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { PROVIDER_HEALTH, MAPBOX_BOUNDARY } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/mapbox")({
  head: () => ({ meta: [{ title: "V1.5 Mapbox Provider · Anderoute" }] }),
  component: Page,
});

const FILES = [
  "src/navigation/providers/MapboxNavigationProvider.ts",
  "src/navigation/services/mapboxRouteService.ts",
  "src/navigation/utils/mapboxRouteParser.ts",
  "src/navigation/types/mapbox.ts",
];

function Page() {
  const m = PROVIDER_HEALTH.find((p) => p.id === "mapbox")!;
  return (
    <V15Page
      icon={<MapPin className="size-6 text-cyan-300" />}
      title="Mapbox Provider Boundary"
      blurb="Directions API for route requests, GL JS for line rendering. Public token in the frontend; any secret stays server-side. Mock provider auto-takes over on failure."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Success rate" value={`${Math.round(m.successRate * 100)}%`} tone={m.successRate >= 0.97 ? "good" : "warn"} />
        <StatTile label="Avg response" value={`${m.avgResponseMs} ms`} tone={m.avgResponseMs < 600 ? "good" : "warn"} />
        <StatTile label="Failures 24h" value={m.failures24h} tone={m.failures24h > 5 ? "warn" : "good"} />
        <StatTile label="Fallback uses" value={m.fallbackUses24h} tone={m.fallbackUses24h ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Config</h2>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li><span className="font-mono">VITE_MAPBOX_PUBLIC_TOKEN</span> — public client token</li>
          <li><span className="font-mono">EXPO_PUBLIC_MAPBOX_TOKEN</span> — mobile placeholder</li>
          <li>Private provider secrets never reach the frontend bundle</li>
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Files</h2>
        <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
          {FILES.map((f) => <div key={f}>· {f}</div>)}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recent errors</h2>
        <div className="mt-2 space-y-1.5">
          {m.errors.map((e) => (
            <Badge key={e} variant="outline" className="mr-1.5 border-rose-500/30 text-rose-300">{e}</Badge>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Provider boundary layers</h2>
        <p className="mt-1 text-xs text-muted-foreground">Each layer pins the secret/data class to a single zone. Browser holds only the URL-restricted public token.</p>
        <div className="mt-3 space-y-2 text-sm">
          {MAPBOX_BOUNDARY.map((l) => (
            <div key={l.layer} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <div className="font-medium">{l.layer}</div>
                <div className="text-xs text-muted-foreground">{l.detail}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{l.scope}</Badge>
                <Badge variant="outline" className={l.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                  {l.ok ? "OK" : "Action"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
