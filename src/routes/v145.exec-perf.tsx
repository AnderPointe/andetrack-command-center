import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const e = H.useExecutivePerformanceManagement();
  return (
    <V145Page icon={<Briefcase className="size-6 text-fuchsia-300" />} title="Executive Performance Management Dashboard" blurb="Executive priorities, blockers, decisions needed, and cross-functional cadence health.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Cadence health" value={`${e.cadence_health}%`} tone="emerald" />
        <ScoreCard label="Blockers" value={e.blockers.length} tone="rose" />
        <ScoreCard label="Decisions needed" value={e.decisions_needed.length} tone="amber" />
      </div>
      <Section title="ExecutivePriorityScorecard">
        <SimpleTable rows={e.priorities.map(p => ({ role: p.role, items: p.items.join(" · ") })) as any} columns={[
          { key: "role", label: "Role" }, { key: "items", label: "Priorities" },
        ]} />
      </Section>
      <Section title="ExecutiveBlockerPanel">
        <ul className="list-disc pl-5 text-sm">{e.blockers.map(b => <li key={b}>{b}</li>)}</ul>
      </Section>
      <Section title="Decisions needed">
        <ul className="list-disc pl-5 text-sm">{e.decisions_needed.map(d => <li key={d}>{d}</li>)}</ul>
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/exec-perf")({ head: () => ({ meta: [{ title: "Exec Performance · V14.5" }] }), component: Page });
