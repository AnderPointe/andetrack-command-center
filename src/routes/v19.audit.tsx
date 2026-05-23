import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const a = H.useAssuranceAuditExecution();
  return (
    <V19Page icon={<FileSearch className="size-6 text-violet-300" />}
      title="Assurance Audit Execution Center"
      blurb="15 audit areas, calendar, findings, remediation, board-visible findings, append-only audit, signed bundle.">
      <ScoreCard label="Audit execution" value={a.score} tone="violet" />
      <KpiGrid cols={4} items={a.kpis} />
      <Section title="Audit calendar">
        <SimpleTable rows={a.calendar as any} columns={[
          { key: "audit", label: "Audit" }, { key: "owner", label: "Owner" }, { key: "schedule", label: "Schedule" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Audit findings">
        <SimpleTable rows={a.findings as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "risk", label: "Risk" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" }, { key: "board", label: "Board?" },
        ]} />
      </Section>
      <Section title="Remediation tracker">
        <SimpleTable rows={a.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Executive summary">
        <ul className="text-sm text-muted-foreground">{a.exec_summary.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">Audit export available via Edge (signed bundle). Placeholder — service-auth only.</p>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/audit")({ component: Page });
