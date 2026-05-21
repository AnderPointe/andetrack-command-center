import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SCALE_TIERS, SCALING_AREAS, SCALING_ALERTS } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { ready: "border-emerald-500/30 text-emerald-300", needs_work: "border-amber-500/30 text-amber-300", placeholder: "border-white/15 text-muted-foreground", good: "border-emerald-500/30 text-emerald-300", warn: "border-amber-500/30 text-amber-300" };

export const Route = createFileRoute("/v25/fleet-scaling")({
  head: () => ({ meta: [{ title: "Fleet Scaling · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Gauge className="size-6 text-emerald-300" />} title="Fleet Scaling Dashboard" blurb="Scale readiness across realtime, GPS, map clustering, pagination, reports, and notifications. V2.5 targets 250 drivers per company.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Scale tiers</h2>
        <div className="mt-3 space-y-2">
          {SCALE_TIERS.map((t) => (
            <div key={t.tier} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div><span className="font-medium">{t.tier}</span> <span className="text-xs text-muted-foreground">— {t.notes}</span></div>
                <Badge variant="outline" className={tone[t.status]}>{t.status.replace("_"," ")} · {t.score}</Badge>
              </div>
              <Progress value={t.score} className="mt-2 h-1" />
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Scaling areas</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Area</th><th className="p-2">Status</th><th className="p-2">Load</th><th className="p-2">Note</th></tr></thead>
          <tbody>
            {SCALING_AREAS.map((a) => (
              <tr key={a.area} className="border-t border-white/10"><td className="p-2">{a.area}</td><td className="p-2"><Badge variant="outline" className={tone[a.status]}>{a.status}</Badge></td><td className="p-2 font-mono text-xs">{a.load}</td><td className="p-2 text-xs text-muted-foreground">{a.note}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Scaling watch alerts</h2>
        <div className="mt-3 space-y-2">
          {SCALING_ALERTS.map((a) => (
            <div key={a.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><div className="font-medium">{a.area}</div><Badge variant="outline" className={a.level === "warn" ? "border-amber-500/30 text-amber-300" : "border-sky-500/30 text-sky-300"}>{a.level}</Badge></div>
              <div className="mt-1 text-xs text-muted-foreground">Currently {a.at} / threshold {a.threshold}</div>
              <div className="mt-1 text-xs"><span className="text-emerald-300">Action:</span> {a.action}</div>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
