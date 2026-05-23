import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const i = H.useStrategicOperatingIntelligence();
  return (
    <V15Page icon={<Brain className="size-6 text-cyan-300" />} title="Strategic Operating Intelligence Center" blurb="Cross-functional signal dashboard, approval queue, recommendation confidence — human approval required.">
      <ScoreCard label="Operating intelligence" value={i.score} tone="sky" />
      <Section title="Intelligence signal dashboard">
        <SimpleTable rows={i.signals as any} columns={[
          { key: "area", label: "Area" },
          { key: "signal", label: "Signal", render: (r: any) => <StatusPill status={r.signal} /> },
          { key: "confidence", label: "Confidence", render: (r: any) => <StatusPill status={r.confidence} /> },
          { key: "approval", label: "Approval", render: (r: any) => <StatusPill status={r.approval} /> },
        ]} />
      </Section>
      <Section title="Human approval required queue">
        <SimpleTable rows={i.approval_queue as any} columns={[
          { key: "rec", label: "Recommendation" }, { key: "owner", label: "Owner" },
          { key: "confidence", label: "Confidence", render: (r: any) => <StatusPill status={r.confidence} /> },
          { key: "impact", label: "Impact" }, { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/intel")({
  head: () => ({ meta: [{ title: "Operating Intel · V15" }] }),
  component: Page,
});
