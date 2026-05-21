import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, ScoreCard, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalOperatingNetworkScale } from "@/v8/hooks";

export const Route = createFileRoute("/v8/network-scale")({
  head: () => ({ meta: [{ title: "Global Operating Network Scale · Anderoute" }] }),
  component: () => {
    const { scale, trend, metrics, hotspots } = useGlobalOperatingNetworkScale();
    return (
      <V8Page icon={<Globe className="size-6 text-violet-300" />} title="Global Operating Network Scale"
        blurb="Active countries, regions, customers, drivers, carriers, marketplace, API/EDI, mobile, CoPilot, support, and revenue — at platform scale.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Scale score" value={scale.score} tone="sky" />
          <ScoreCard label="Trend Δ" value={`+${scale.trend_pts}`} tone="emerald" />
          <ScoreCard label="Countries active" value={scale.countries_active} tone="emerald" />
          <ScoreCard label="Countries in motion" value={scale.countries_pilot + scale.countries_planning + scale.countries_research} tone="amber" />
        </div>
        <KpiGrid cols={4} items={metrics.slice(0, 8).map(m => ({ label: m.metric, value: m.value, sub: m.sub }))} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Operating volume</h3>
          <SimpleTable rows={metrics as any} columns={[
            { key: "metric", label: "Metric" },
            { key: "value",  label: "Value" },
            { key: "sub",    label: "Notes" },
          ]} />
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Scale trend (6 weeks)</h3>
            <SimpleTable rows={trend as any} columns={[
              { key: "week", label: "Week" },
              { key: "score", label: "Score" },
              { key: "countries_live", label: "Countries live" },
            ]} />
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Regional risk / opportunity hotspots</h3>
            <SimpleTable rows={hotspots as any} columns={[
              { key: "region", label: "Region" },
              { key: "risk",   label: "Risk" },
              { key: "opportunity", label: "Opportunity" },
            ]} />
          </Card>
        </div>
      </V8Page>
    );
  },
});
