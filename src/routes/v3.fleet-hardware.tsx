import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FLEET_HARDWARE } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/fleet-hardware")({
  head: () => ({ meta: [{ title: "Fleet Hardware · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Cpu className="size-6 text-sky-300" />} title="Fleet Hardware Integration Readiness"
      blurb="Inventory + assignment scaffolding for tablets, GPS trackers, dashcams, ELDs, temp sensors, and trailer trackers. Most categories are placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Kind</th><th className="p-2">Model</th><th className="p-2">Assigned</th><th className="p-2">Health</th></tr></thead>
          <tbody>{FLEET_HARDWARE.map((h) => (
            <tr key={h.id} className="border-t border-white/10"><td className="p-2">{h.kind}</td><td className="p-2 text-muted-foreground">{h.model}</td><td className="p-2 font-mono text-xs">{h.assigned_to}</td><td className="p-2"><Badge variant="outline" className={h.health === "ok" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{h.health}</Badge></td></tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
