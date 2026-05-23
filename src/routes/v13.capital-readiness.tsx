import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V13Page } from "@/components/v13/V13Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v13/ui-bits";
import * as H from "@/v13/hooks";

function Page() {
  const c = H.useEnterpriseCapitalReadiness();
  const trends = H.useV13CapitalTrends();
  const headline = H.useV13ExecHeadline();
  return (
    <V13Page icon={<Command className="size-6 text-indigo-300" />} title="Enterprise Capital Readiness Command Center" blurb="Capital readiness score, KPIs, gaps, and next actions. Mock-only — no IPO/acquisition readiness claims.">
      <Card className="border-indigo-400/20 bg-indigo-400/5 p-4">
        <div className="text-xs uppercase tracking-wide text-indigo-200/80">Exec headline</div>
        <p className="mt-1 text-sm">{headline.headline}</p>
      </Card>
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Capital readiness" value={c.score} tone="emerald" />
        <ScoreCard label="QoQ trend" value={c.trend_qoq} tone="sky" />
        <ScoreCard label="KPIs tracked" value={c.kpis.length} tone="violet" />
        <ScoreCard label="Open gaps" value={c.gaps.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">KPI grid</h3>
        <SimpleTable rows={c.kpis as any} columns={[{ key: "kpi", label: "KPI" }, { key: "pct", label: "%" }]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Gap panel</h3>
          <SimpleTable rows={c.gaps as any} columns={[{ key: "gap", label: "Gap" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Severity" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action plan</h3>
          <SimpleTable rows={c.actions as any} columns={[{ key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital readiness trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "score", label: "Score" },
          { key: "ready_kpis", label: "Ready KPIs" }, { key: "gaps_open", label: "Open gaps" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Executive capital summary</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {c.exec_summary.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </Card>
    </V13Page>
  );
}

export const Route = createFileRoute("/v13/capital-readiness")({
  head: () => ({ meta: [{ title: "Capital Readiness · Phase 39" }] }),
  component: Page,
});
