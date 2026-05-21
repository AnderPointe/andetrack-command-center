import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { EXEC_KPIS, TREND_LOADS, TREND_ONTIME, TREND_UTIL, TREND_NOTES } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/executive")({
  head: () => ({ meta: [{ title: "Executive · Anderoute" }] }),
  component: Page,
});

function Spark({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data), max = Math.max(...data);
  const w = 160, h = 36;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
    </svg>
  );
}

function Page() {
  return (
    <V2Page
      icon={<BarChart3 className="size-6 text-violet-300" />}
      title="Executive Intelligence Dashboard"
      blurb="Operations health, utilization, on-time performance, customer risk, integration health, AI recommendation impact, and V2 adoption — at a glance for executives and admins."
    >
      <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-7">
        {EXEC_KPIS.map((k) => (
          <StatTile key={k.id} label={k.label} value={k.value} hint={k.hint} tone={k.tone} />
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">Loads completed (7d)</div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">+18%</Badge>
          </div>
          <Spark data={TREND_LOADS} color="hsl(155 80% 60%)" />
          <div className="mt-2 text-xs text-muted-foreground">{TREND_NOTES.loads}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">On-time % (7d)</div>
            <Badge variant="outline" className="border-amber-500/30 text-amber-300">-2 pp</Badge>
          </div>
          <Spark data={TREND_ONTIME} color="hsl(40 90% 60%)" />
          <div className="mt-2 text-xs text-muted-foreground">{TREND_NOTES.ontime}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">Driver utilization (7d)</div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">+8 pp</Badge>
          </div>
          <Spark data={TREND_UTIL} color="hsl(265 90% 70%)" />
          <div className="mt-2 text-xs text-muted-foreground">{TREND_NOTES.util}</div>
        </Card>
      </div>
    </V2Page>
  );
}
