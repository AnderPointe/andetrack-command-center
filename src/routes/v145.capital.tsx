import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, KpiGrid, Section, SimpleTable, ExecHeadline } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useStrategicCapitalDiscipline();
  const hp = H.useV145PolishHeadlines();
  const cov = H.useV145ControlCoverage();
  const rls = H.useV145RlsExtended();
  const cap = rls.find(r => r.table === "strategic_capital_discipline_records");
  const ev = rls.find(r => r.table === "capital_evidence_discipline_records");
  return (
    <V145Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Strategic Capital Discipline Center" blurb="Capital actions, evidence freshness, data-room readiness, blockers, owner accountability.">
      <ExecHeadline tag={hp.capital.tag} headline={hp.capital.headline} bullets={hp.capital.bullets} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Capital discipline" value={c.score} tone="amber" />
        <ScoreCard label="Evidence freshness" value={`${c.evidence_fresh_pct}%`} tone="emerald" />
        <ScoreCard label="Data-room readiness" value={`${c.data_room_ready_pct}%`} tone="violet" />
        <ScoreCard label="Blockers" value={c.blockers.length} tone="rose" />
      </div>
      <Section title="CapitalActionDisciplineBoard">
        <SimpleTable rows={c.actions as any} columns={[
          { key: "area", label: "Area" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status" }, { key: "due", label: "Due" },
        ]} />
      </Section>
      <Section title="CapitalBlockerCommandPanel">
        <SimpleTable rows={c.blockers as any} columns={[
          { key: "item", label: "Blocker" }, { key: "severity", label: "Severity" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Capital control coverage (polish)">
        <SimpleTable rows={cov.filter(c => /capital|evidence|diligence|risk/i.test(c.layer)) as any} columns={[
          { key: "layer", label: "Control layer" }, { key: "coverage", label: "Coverage %" },
          { key: "tested_q", label: "Last tested" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <KpiGrid cols={3} items={[
        { label: "Owners assigned", value: c.actions.length },
        { label: "Evidence freshness", value: `${c.evidence_fresh_pct}%` },
        { label: "Data-room readiness", value: `${c.data_room_ready_pct}%` },
      ]} />
      <Section title="RLS — strategic_capital_discipline_records">
        <pre className="overflow-x-auto rounded bg-black/40 p-3 text-[11px] text-emerald-200/90">{cap?.snippet}</pre>
      </Section>
      <Section title="RLS — capital_evidence_discipline_records">
        <pre className="overflow-x-auto rounded bg-black/40 p-3 text-[11px] text-emerald-200/90">{ev?.snippet}</pre>
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/capital")({ head: () => ({ meta: [{ title: "Capital Discipline · V14.5" }] }), component: Page });
