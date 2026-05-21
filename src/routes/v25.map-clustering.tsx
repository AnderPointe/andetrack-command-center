import { createFileRoute } from "@tanstack/react-router";
import { Map as MapIcon } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MAP_CLUSTER_CONFIG } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/map-clustering")({
  head: () => ({ meta: [{ title: "Map Clustering · Anderoute" }] }),
  component: () => (
    <V25Page icon={<MapIcon className="size-6 text-emerald-300" />} title="Advanced Map Clustering" blurb="Cluster strategies for larger fleets: status, vehicle type, delayed driver, stale GPS, customer location, and route density (placeholder).">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Cluster type</th><th className="p-2">Enabled</th><th className="p-2">Threshold</th><th className="p-2">Note</th></tr></thead>
          <tbody>
            {MAP_CLUSTER_CONFIG.map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="p-2">{c.type}</td>
                <td className="p-2">{c.enabled ? <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">on</Badge> : <Badge variant="outline" className="border-white/15 text-muted-foreground">off</Badge>}</td>
                <td className="p-2 font-mono text-xs">{c.threshold}</td>
                <td className="p-2 text-xs text-muted-foreground">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
