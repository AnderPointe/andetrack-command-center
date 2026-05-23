import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const b = H.useBoardAutomationScaleReporting();
  return (
    <V175Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Board Automation Scale Reporting"
      blurb="Board-ready summary with 15 sections, KPI appendix, exceptions, decisions needed, and action tracker.">
      <KpiGrid cols={4} items={[
        { label: "Approvals (quarter)", value: String(b.outcome_summary.approvals_quarter) },
        { label: "Approved %", value: b.outcome_summary.approved_pct },
        { label: "Exceptions", value: String(b.outcome_summary.exceptions) },
        { label: "Mitigation rate", value: b.outcome_summary.mitigation_rate },
      ]} />
      <Section title="Report sections">
        <SimpleTable rows={b.sections as any} columns={[{ key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" }]} />
      </Section>
      <Section title="KPI appendix">
        <SimpleTable rows={b.kpi_appendix as any} columns={[{ key: "kpi", label: "KPI" }, { key: "value", label: "Value" }]} />
      </Section>
      <Section title="Exceptions">
        <SimpleTable rows={b.exceptions as any} columns={[{ key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" }]} />
      </Section>
      <Section title="Decisions needed">
        <SimpleTable rows={b.decisions as any} columns={[{ key: "id", label: "ID" }, { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "sla", label: "SLA" }]} />
      </Section>
      <Section title="Action tracker">
        <SimpleTable rows={b.action_tracker as any} columns={[{ key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" }]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/board-report")({ component: Page });
