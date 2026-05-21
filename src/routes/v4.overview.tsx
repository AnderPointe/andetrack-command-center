import { createFileRoute } from "@tanstack/react-router";
import { Rocket, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { V4_READINESS, LAUNCH_KPIS, READINESS_TREND } from "@/v4/data/mockPhase21";

function Trend({ v }: { v: number }) {
  if (v > 0) return <TrendingUp className="size-3 text-emerald-300" />;
  if (v < 0) return <TrendingDown className="size-3 text-amber-300" />;
  return <Minus className="size-3 text-muted-foreground" />;
}

export const Route = createFileRoute("/v4/overview")({
  head: () => ({ meta: [{ title: "V4 Overview · Anderoute" }] }),
  component: () => {
    const max = Math.max(...READINESS_TREND.map(t => t.overall));
    const min = Math.min(...READINESS_TREND.map(t => t.overall));
    return (
      <V4Page icon={<Rocket className="size-6 text-sky-300" />} title="V4 Full Enterprise Launch Readiness"
        blurb="National-scale logistics operating platform: strategic integrations, carrier marketplace scale, national operations, mobile certification, enterprise support, governance, and revenue operations.">
        <div className="grid gap-3 md:grid-cols-6">
          {LAUNCH_KPIS.map(k => (
            <Card key={k.label} className="border-white/10 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-xl font-semibold">{k.value}</div>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Trend v={k.trend} />{k.trend > 0 ? "+" : ""}{k.trend} wk
              </div>
            </Card>
          ))}
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-sm font-semibold">Launch readiness trend</h3>
              <div className="text-xs text-muted-foreground">7-week rollup · range {min}–{max}%</div>
            </div>
            <div className="text-3xl font-semibold">{V4_READINESS.overall}%</div>
          </div>
          <div className="mt-3 flex items-end gap-2 h-24">
            {READINESS_TREND.map(t => (
              <div key={t.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-sky-400/40" style={{ height: `${(t.overall - 60) * 2}px` }} />
                <div className="text-[10px] text-muted-foreground">{t.week}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-3 md:grid-cols-4">
          {Object.entries(V4_READINESS).filter(([k]) => k !== "overall").map(([k, v]) => (
            <Card key={k} className="border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
              <div className="mt-1 text-2xl font-semibold">{v}%</div>
              <Progress value={v as number} className="mt-2 h-1.5" />
            </Card>
          ))}
        </div>
      </V4Page>
    );
  },
});
