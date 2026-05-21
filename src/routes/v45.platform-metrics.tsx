import { createFileRoute } from "@tanstack/react-router";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { Card } from "@/components/ui/card";
import { PLATFORM_METRICS } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/platform-metrics")({
  head: () => ({ meta: [{ title: "Platform Metrics · Anderoute" }] }),
  component: () => (
    <V45Page icon={<Activity className="size-6 text-violet-300" />} title="Platform Operating Metrics"
      blurb="Active tenants, dispatchers, drivers, carriers; daily/monthly volume; marketplace awards, API/EDI/GPS/webhook throughput, support load, mobile sessions and CoPilot actions.">
      <div className="grid gap-3 md:grid-cols-5">
        {PLATFORM_METRICS.map(m => {
          const T = typeof m.trend === "number" && m.trend > 0 ? TrendingUp : typeof m.trend === "number" && m.trend < 0 ? TrendingDown : Minus;
          const tone = typeof m.trend === "number" && m.trend > 0 ? "text-emerald-300" : typeof m.trend === "number" && m.trend < 0 ? "text-rose-300" : "text-muted-foreground";
          return (
            <Card key={m.label} className="border-white/10 bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
              <div className="mt-1 text-xl font-semibold">{typeof m.value === "number" ? m.value.toLocaleString() : m.value}</div>
              <div className={`mt-1 flex items-center gap-1 text-[10px] ${tone}`}>
                <T className="size-3" /> {typeof m.trend === "number" ? `${m.trend > 0 ? "+" : ""}${m.trend.toLocaleString()}` : "—"}
              </div>
            </Card>
          );
        })}
      </div>
    </V45Page>
  ),
});
