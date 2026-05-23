import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const r = H.useBoardAssuranceIntelligenceReporting();
  return (
    <V195Page icon={<FileBarChart className="size-6 text-violet-300" />}
      title="Board Assurance Intelligence Reporting"
      blurb="18 sections · audience-scoped redaction · decisions queue · next-quarter priorities. Approval-gated for board distribution.">
      <ScoreCard label="Report readiness" value={r.score} tone="sky" />
      <Section title="Sections">
        <SimpleTable rows={r.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Decisions queue (HITL)">
        <SimpleTable rows={r.decisions_queue as any} columns={[
          { key: "id", label: "ID" }, { key: "item", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
        ]} />
      </Section>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/board-report")({ component: Page });
