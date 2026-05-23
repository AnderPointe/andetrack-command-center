import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const c = H.useDurableCapitalExecution();
  return (
    <V15Page icon={<Wallet className="size-6 text-cyan-300" />} title="Durable Capital Execution Center" blurb="Capital strategy actions, evidence freshness, owner accountability, gap panel, executive brief.">
      <ScoreCard label="Capital execution" value={c.score} tone="amber" />
      <Section title="Capital execution command board">
        <SimpleTable rows={c.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Capital evidence freshness">
        <SimpleTable rows={c.evidence_freshness as any} columns={[
          { key: "cat", label: "Category" },
          { key: "fresh", label: "Freshness", render: (r: any) => <StatusPill status={r.fresh} /> },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Capital execution gap panel / blockers">
        <SimpleTable rows={c.blockers as any} columns={[
          { key: "area", label: "Area" },
          { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
          { key: "note", label: "Note" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/capital")({
  head: () => ({ meta: [{ title: "Capital Execution · V15" }] }),
  component: Page,
});
