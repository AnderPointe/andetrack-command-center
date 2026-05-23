import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const c = H.useEnterprisePerformanceControls();
  return (
    <V15Page icon={<ShieldCheck className="size-6 text-cyan-300" />} title="Enterprise Performance Controls Matrix" blurb="Performance control matrix with owner, frequency, coverage, last tested, status; exception + remediation tracker.">
      <ScoreCard label="Performance controls" value={c.score} tone="sky" />
      <Section title="Control matrix">
        <SimpleTable rows={c.controls as any} columns={[
          { key: "domain", label: "Domain" }, { key: "control", label: "Control" },
          { key: "owner", label: "Owner" }, { key: "freq", label: "Freq" },
          { key: "coverage", label: "Coverage %" }, { key: "last_tested", label: "Last tested" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
      <Section title="Exception queue">
        <SimpleTable rows={c.exceptions as any} columns={[
          { key: "exception", label: "Exception" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/controls")({
  head: () => ({ meta: [{ title: "Performance Controls · V15" }] }),
  component: Page,
});
