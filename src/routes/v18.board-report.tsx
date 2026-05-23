import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const b = H.useBoardAssistScaleReporting();
  return (
    <V18Page icon={<FileBarChart className="size-6 text-violet-300" />} title="Board Autonomous-Assist Scale Reporting"
      blurb="14 sections + decisions needed. Board admin generates · CEO/Board approve. No external use without approval.">
      <Section title="Report sections">
        <SimpleTable rows={b.sections as any} columns={[{ key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "approver", label: "Approver" }]} />
      </Section>
      <Section title="Decisions needed">
        <ul className="text-sm text-muted-foreground">{b.decisions_needed.map(d => <li key={d}>· {d}</li>)}</ul>
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/board-report")({ component: Page });
