import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const r = H.useBoardPredictiveIntelligenceReporting();
  return (
    <V165Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board-Level Predictive Intelligence Reporting"
      blurb="Board report sections covering predictive governance, packet readiness, revenue + MP automation, approval orchestration, risk routing, outcomes, and next-quarter priorities.">
      <Section title="Report sections">
        <SimpleTable rows={r.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "value", label: "Value" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={r.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "report", label: "Report" }, { key: "action", label: "Action" }, { key: "actor", label: "Actor" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/board-report")({ component: Page });
