import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const b = H.useBoardEnterprisePerformanceReporting();
  return (
    <V15Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board Enterprise Performance Reporting" blurb="Board performance report builder, KPI appendix, summary, evidence panel, decision queue.">
      <ScoreCard label="Board reporting" value={b.score} tone="sky" />
      <KpiGrid cols={4} items={b.kpis.map((k) => ({ label: k.area, value: `${k.pct}%` }))} />
      <Section title="Decisions">
        <SimpleTable rows={b.decisions as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Next quarter priorities">
        <ol className="list-decimal space-y-1 pl-5 text-xs">{b.next_quarter_priorities.map((p) => <li key={p}>{p}</li>)}</ol>
      </Section>
      <Section title="Evidence panel (placeholder)">
        <div className="text-xs text-muted-foreground">Board reports include linked evidence; only approved reports are visible to board role (RLS).</div>
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/board-reports")({
  head: () => ({ meta: [{ title: "Board Reports · V15" }] }),
  component: Page,
});
