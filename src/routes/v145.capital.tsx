import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const c = H.useStrategicCapitalDiscipline();
  return (
    <V145Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Strategic Capital Discipline Center" blurb="Capital actions, evidence freshness, data-room readiness, blockers, owner accountability.">
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
      <KpiGrid cols={3} items={[
        { label: "Owners assigned", value: c.actions.length },
        { label: "Evidence freshness", value: `${c.evidence_fresh_pct}%` },
        { label: "Data-room readiness", value: `${c.data_room_ready_pct}%` },
      ]} />
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/capital")({ head: () => ({ meta: [{ title: "Capital Discipline · V14.5" }] }), component: Page });
