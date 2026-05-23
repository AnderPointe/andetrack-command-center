import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, ExecHeadline } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const o = H.useEnterpriseOperatingExcellence();
  const h = H.useV145ExecHeadline();
  return (
    <V145Page icon={<Command className="size-6 text-fuchsia-300" />} title="Enterprise Operating Excellence Command Center" blurb="OpEx score, capital/revenue/MP/category disciplines, gaps, and the executive action plan.">
      <ExecHeadline tag="Executive summary" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating excellence" value={o.score} tone="violet" />
        <ScoreCard label="OpEx QoQ" value={`+${o.trend_qoq}`} tone="emerald" />
        <ScoreCard label="Open gaps" value={o.gaps.length} tone="amber" />
        <ScoreCard label="Top actions" value={o.actions.length} tone="sky" />
      </div>
      <Section title="OperatingExcellenceKPIGrid">
        <KpiGrid cols={4} items={o.kpis.map(k => ({ label: k.dim, value: `${k.pct}%` }))} />
      </Section>
      <Section title="OperatingExcellenceGapPanel">
        <ul className="list-disc pl-5 text-sm">{o.gaps.map(g => <li key={g}>{g}</li>)}</ul>
      </Section>
      <Section title="OperatingExcellenceActionPlan">
        <SimpleTable rows={o.actions as any} columns={[
          { key: "owner", label: "Owner" }, { key: "action", label: "Action" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/opex")({ head: () => ({ meta: [{ title: "Operating Excellence · V14.5" }] }), component: Page });
