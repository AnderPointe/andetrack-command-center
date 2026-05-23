import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, TrendBars } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const lt = H.useLongTermPerformanceManagement();
  return (
    <V145Page icon={<Map className="size-6 text-fuchsia-300" />} title="Long-Term Performance Management System" blurb="Enterprise long-term scorecard, gaps, action plan and quarterly trend.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="LT performance" value={lt.score} tone="emerald" />
        <ScoreCard label="Gaps" value={lt.gaps.length} tone="amber" />
        <ScoreCard label="Actions" value={lt.actions.length} tone="violet" />
      </div>
      <Section title="PerformanceManagementKPIGrid">
        <KpiGrid cols={4} items={lt.kpis.map(k => ({ label: k.dim, value: `${k.pct}%` }))} />
      </Section>
      <TrendBars title="LT performance QoQ" points={lt.trends.map(t => ({ label: t.q, value: t.pct }))} />
      <Section title="PerformanceGapPanel">
        <ul className="list-disc pl-5 text-sm">{lt.gaps.map(g => <li key={g}>{g}</li>)}</ul>
      </Section>
      <Section title="LongTermPerformanceActionPlan">
        <SimpleTable rows={lt.actions as any} columns={[
          { key: "owner", label: "Owner" }, { key: "action", label: "Action" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/lt-perf")({ head: () => ({ meta: [{ title: "LT Performance · V14.5" }] }), component: Page });
