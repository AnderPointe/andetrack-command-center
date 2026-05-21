import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { ScoreCard, SimpleTable } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { V5_MATURITY, V5_MATURITY_TREND } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/maturity")({
  head: () => ({ meta: [{ title: "Platform Maturity · Anderoute V5" }] }),
  component: () => {
    const pillars = Object.entries(V5_MATURITY).filter(([k]) => k !== "overall");
    const gaps = pillars.filter(([, v]) => (v as number) < 82).map(([k, v]) => ({ pillar: k, score: v, gap: 90 - (v as number) }));
    return (
      <V5Page icon={<Activity className="size-6 text-fuchsia-300" />} title="National Platform Maturity Dashboard"
        blurb="Composite maturity scoring across product, marketplace, revenue, CS, support, compliance, security, mobile, integration, partner, data, AI governance, ops, enterprise readiness and category leadership.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Overall" value={V5_MATURITY.overall} tone="violet" />
          {pillars.slice(0, 7).map(([k, v]) => (
            <ScoreCard key={k} label={k.replace(/_/g, " ")} value={v as number} tone="sky" />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Maturity trend</h3>
            <div className="mt-3 flex items-end gap-2 h-32">
              {V5_MATURITY_TREND.map(p => (
                <div key={p.quarter} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-fuchsia-400/60" style={{ height: `${p.overall}%` }} />
                  <div className="text-[10px] text-muted-foreground">{p.quarter}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Gap panel · target 90</h3>
            <div className="mt-2">
              <SimpleTable rows={gaps} columns={[
                { key: "pillar", label: "Pillar" },
                { key: "score",  label: "Score" },
                { key: "gap",    label: "Gap"   },
              ]} />
            </div>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Executive summary</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Platform is national-scale ready across product, integration, and customer success. Marketplace and category-leadership pillars are the highest-leverage gaps. Next 90 days: SE carrier recruiting, SOC 2 audit kickoff, board-grade reporting cadence.
          </p>
        </Card>
      </V5Page>
    );
  },
});
