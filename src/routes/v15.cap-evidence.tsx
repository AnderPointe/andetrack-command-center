import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const e = H.useCapitalEvidenceGovernance();
  return (
    <V15Page icon={<Lock className="size-6 text-cyan-300" />} title="Capital Evidence Governance Center" blurb="Evidence categories with owner, freshness, approval, external/board/data-room use, gap, remediation, governance status.">
      <ScoreCard label="Capital evidence governance" value={e.score} tone="amber" />
      <Section title="Evidence governance matrix">
        <SimpleTable rows={e.items as any} columns={[
          { key: "cat", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "fresh", label: "Freshness", render: (r: any) => <StatusPill status={r.fresh} /> },
          { key: "approved", label: "Approved", render: (r: any) => <StatusPill status={r.approved ? "approved" : "pending"} /> },
          { key: "external", label: "External", render: (r: any) => <StatusPill status={r.external ? "ready" : "pending"} /> },
          { key: "board", label: "Board", render: (r: any) => <StatusPill status={r.board ? "ready" : "pending"} /> },
          { key: "data_room", label: "Data room", render: (r: any) => <StatusPill status={r.data_room ? "ready" : "pending"} /> },
          { key: "gap", label: "Gap", render: (r: any) => <StatusPill status={r.gap ? "high" : "tracking"} /> },
          { key: "remediation", label: "Remediation" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/cap-evidence")({
  head: () => ({ meta: [{ title: "Capital Evidence · V15" }] }),
  component: Page,
});
