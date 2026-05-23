import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const e = H.useExecutivePerformanceControl();
  return (
    <V15Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Executive Performance Control Tower" blurb="Executive priorities, blockers, escalation queue, cadence health, executive brief.">
      <ScoreCard label="Executive performance" value={e.score} tone="violet" />
      <Section title="Executive priorities">
        <SimpleTable rows={e.priorities as any} columns={[
          { key: "exec", label: "Exec" }, { key: "priority", label: "Priority" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Cross-functional blockers">
        <SimpleTable rows={e.blockers as any} columns={[
          { key: "blocker", label: "Blocker" },
          { key: "level", label: "Level", render: (r: any) => <StatusPill status={r.level} /> },
        ]} />
      </Section>
      <Section title="Cadence health">
        <SimpleTable rows={e.cadence as any} columns={[
          { key: "cadence", label: "Cadence" }, { key: "frequency", label: "Frequency" },
          { key: "completion", label: "Completion %" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/exec")({
  head: () => ({ meta: [{ title: "Exec Control · V15" }] }),
  component: Page,
});
