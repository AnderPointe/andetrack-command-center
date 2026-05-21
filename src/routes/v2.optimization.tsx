import { createFileRoute } from "@tanstack/react-router";
import { Cpu } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OPT_LOAD, OPT_CANDIDATES, OPT_WEIGHTS } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/optimization")({
  head: () => ({ meta: [{ title: "Optimization Engine · Anderoute" }] }),
  component: Page,
});

function Page() {
  const top = OPT_CANDIDATES.slice().sort((a, b) => b.score - a.score)[0];
  return (
    <V2Page
      icon={<Cpu className="size-6 text-violet-300" />}
      title="Optimization Engine V2"
      blurb="Best-driver-for-load scoring. Inputs: vehicle match, CDL, distance, ETA confidence, availability, on-time score, GPS freshness, current workload. Practical, single-load — multi-constraint optimization is V2.5."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Load under optimization</h2>
        <div className="mt-2 grid gap-2 text-xs text-muted-foreground md:grid-cols-3">
          <div>ID: <span className="text-foreground">{OPT_LOAD.id}</span></div>
          <div>Vehicle: <span className="text-foreground">{OPT_LOAD.vehicleType}</span></div>
          <div>CDL: <span className="text-foreground">{OPT_LOAD.cdlRequired}</span></div>
          <div>Pickup: <span className="text-foreground">{OPT_LOAD.pickup}</span></div>
          <div>Dropoff: <span className="text-foreground">{OPT_LOAD.dropoff}</span></div>
          <div>Window: <span className="text-foreground">{OPT_LOAD.windowStart}–{OPT_LOAD.windowEnd}</span></div>
        </div>
      </Card>

      <Card className="border-emerald-500/30 bg-emerald-500/[0.04] p-4 text-sm">
        <h2 className="font-semibold text-emerald-200">Recommended: {top.driver} ({top.driverId})</h2>
        <p className="mt-1 text-xs text-emerald-100/80">{top.explanation}</p>
        <p className="mt-1 text-xs text-emerald-100/60">Requires dispatcher approval before assignment.</p>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Ranked candidates</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-2">Driver</th>
                <th className="p-2">Vehicle</th>
                <th className="p-2">Status</th>
                <th className="p-2">Dist</th>
                <th className="p-2">ETA</th>
                <th className="p-2">Veh</th>
                <th className="p-2">CDL</th>
                <th className="p-2">Avail</th>
                <th className="p-2">On-time</th>
                <th className="p-2">GPS</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {OPT_CANDIDATES.slice().sort((a, b) => b.score - a.score).map((c) => (
                <tr key={c.driverId} className="border-t border-white/10">
                  <td className="p-2 font-medium">{c.driver}<div className="text-xs text-muted-foreground">{c.driverId}</div></td>
                  <td className="p-2">{c.vehicleType}</td>
                  <td className="p-2"><Badge variant="outline" className="border-white/15">{c.status.replace("_", " ")}</Badge></td>
                  <td className="p-2">{c.distanceMi} mi</td>
                  <td className="p-2">{c.etaMin}m</td>
                  <td className="p-2">{c.vehicleMatch}</td>
                  <td className="p-2">{c.cdlMatch}</td>
                  <td className="p-2">{c.availability}</td>
                  <td className="p-2">{c.onTime}</td>
                  <td className="p-2">{c.gpsFresh ? "✓" : "—"}</td>
                  <td className="p-2 font-semibold">{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </V2Page>
  );
}
