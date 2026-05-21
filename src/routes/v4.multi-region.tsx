import { createFileRoute } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { REGIONS, REGION_ALERTS } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/multi-region")({
  head: () => ({ meta: [{ title: "Multi-Region Dispatch · Anderoute" }] }),
  component: () => (
    <V4Page icon={<MapPinned className="size-6 text-sky-300" />} title="Multi-Region Dispatch Operations"
      blurb="Region-aware dispatch with timezone awareness, regional load/driver boards, regional alerts and region-scoped permissions.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional alerts</h3>
        <ul className="mt-2 space-y-1 text-sm">{REGION_ALERTS.map((a,i) => (
          <li key={i} className={`flex items-center justify-between rounded border p-2 ${a.level === "warn" ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 bg-black/20"}`}>
            <span><span className="font-medium">{a.region}</span> — {a.msg}</span>
            <Badge variant="outline" className={a.level === "warn" ? "border-amber-400/40 text-amber-300" : "border-white/15"}>{a.level}</Badge>
          </li>))}
        </ul>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {REGIONS.map(r => (
          <Card key={r.id} className="border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.tz}</div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div>Loads {r.loads}</div><div>Drivers {r.drivers}</div>
              </div>
            </div>
            <div className="mt-3 text-xs">Driver utilization {r.util}%</div>
            <Progress value={r.util} className="mt-1 h-1.5" />
          </Card>
        ))}
      </div>
    </V4Page>
  ),
});
