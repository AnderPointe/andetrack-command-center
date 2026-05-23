import { createFileRoute } from "@tanstack/react-router";
import { Command } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const c = H.useEnterprisePerformanceCommand();
  return (
    <V15Page icon={<Command className="size-6 text-cyan-300" />} title="Enterprise Performance Command Center" blurb="Performance score, KPI grid, health map, gap panel, executive summary, action plan.">
      <ScoreCard label="Enterprise performance" value={c.score} tone="violet" />
      <KpiGrid cols={5} items={c.kpis.slice(0,5).map((k) => ({ label: k.dim, value: `${k.pct}%` }))} />
      <KpiGrid cols={5} items={c.kpis.slice(5,10).map((k) => ({ label: k.dim, value: `${k.pct}%` }))} />
      <KpiGrid cols={5} items={c.kpis.slice(10,15).map((k) => ({ label: k.dim, value: `${k.pct}%` }))} />
      <Section title="Health map">
        <SimpleTable rows={c.health_map as any} columns={[
          { key: "area", label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Gap panel">
        <ul className="list-disc space-y-1 pl-5 text-xs">{c.gaps.map((g) => <li key={g}>{g}</li>)}</ul>
      </Section>
      <Section title="Executive summary action plan">
        <SimpleTable rows={c.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/command")({
  head: () => ({ meta: [{ title: "Performance Command · V15" }] }),
  component: Page,
});
