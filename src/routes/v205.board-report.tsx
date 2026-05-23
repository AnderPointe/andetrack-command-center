import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { KpiGrid, Section, SimpleTable } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const b = H.useBoardTrustScaleReporting();
  return (
    <V205Page icon={<FileBarChart className="size-6 text-teal-300" />} title="Board Trust Scale Reporting Center"
      blurb="21-section board-ready trust scale report with KPI appendix, decisions needed, action tracker.">
      <KpiGrid cols={4} items={b.kpi_appendix} />
      <Section title="Report sections (21)">
        <SimpleTable rows={b.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Decisions needed">
        <SimpleTable rows={b.decisions as any} columns={[
          { key: "id", label: "ID" }, { key: "decision", label: "Decision" }, { key: "owner", label: "Owner" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Action tracker">
        <SimpleTable rows={b.actions as any} columns={[
          { key: "id", label: "ID" }, { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/board-report")({ component: Page });
