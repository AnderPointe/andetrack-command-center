import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const d = H.useV135Durability();
  const trends = H.useV135DurabilityTrends();
  return (
    <V135Page icon={<Command className="size-6 text-fuchsia-300" />} title="Revenue Durability Governance Center" blurb="Durability score with KPIs, gaps, and actions across revenue, customer, channel, MP, and partner.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Durability score" value={d.score} tone="emerald" />
        <ScoreCard label="QoQ trend" value={`+${d.trend_qoq}`} tone="sky" />
        <ScoreCard label="Open gaps" value={d.gaps.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">KPIs</h3>
        <SimpleTable rows={d.kpis as any} columns={[{ key: "kpi", label: "KPI" }, { key: "pct", label: "%" }]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gaps</h3>
          <SimpleTable rows={d.gaps as any} columns={[
            { key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Sev" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Actions</h3>
          <SimpleTable rows={d.actions as any} columns={[
            { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          ]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Durability trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "q", label: "Q" }, { key: "score", label: "Score" },
          { key: "evidence", label: "Evidence" }, { key: "board", label: "Board" },
        ]} />
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/durability")({
  head: () => ({ meta: [{ title: "Durability · V13.5" }] }),
  component: Page,
});
