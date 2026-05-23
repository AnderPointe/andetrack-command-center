import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { Section, SimpleTable, KpiGrid } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const r = H.useBoardAssuranceReporting();
  return (
    <V19Page icon={<FileBarChart className="size-6 text-violet-300" />}
      title="Board Assurance Reporting System"
      blurb="17-section board packet: enterprise assurance, resilience, board execution, revenue/MP/exec/evidence/audit/approval/rec/outcome/risk/capital assurance, exceptions, remediation, decisions, next quarter.">
      <Section title="Report sections">
        <SimpleTable rows={r.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "status", label: "Status" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Decision queue">
        <SimpleTable rows={r.decisions as any} columns={[
          { key: "id", label: "ID" }, { key: "title", label: "Title" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Action tracker">
        <SimpleTable rows={r.actions as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Enterprise assurance KPI appendix">
        <KpiGrid cols={4} items={r.appendix_kpis} />
      </Section>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/board-report")({ component: Page });
