import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const b = H.useBoardEnterpriseIntelligence();
  return (
    <V15Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Board-Level Enterprise Intelligence Center" blurb="Board KPI grid, intelligence summary, decision queue, action completion, strategic risk visibility, next quarter priorities.">
      <ScoreCard label="Board enterprise intelligence" value={b.score} tone="sky" />
      <KpiGrid cols={4} items={b.kpis.map((k) => ({ label: k.area, value: `${k.pct}%` }))} />
      <Section title="Decision intelligence queue">
        <SimpleTable rows={b.decisions as any} columns={[
          { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Action completion & next quarter priorities">
        <div className="text-sm">Board action completion: <span className="font-semibold">{b.actions_completion}%</span></div>
        <ol className="list-decimal space-y-1 pl-5 text-xs">{b.next_quarter_priorities.map((p) => <li key={p}>{p}</li>)}</ol>
      </Section>
      <Section title="RLS policy (board enterprise intelligence)">
        {H.useV15RlsExtended().filter(r => r.table === "board_enterprise_intelligence_records").map(r => (
          <pre key={r.table} className="overflow-x-auto rounded border border-white/10 bg-black/30 p-2 text-[11px] leading-relaxed">{r.policy}</pre>
        ))}
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/board-intel")({
  head: () => ({ meta: [{ title: "Board Intel · V15" }] }),
  component: Page,
});
