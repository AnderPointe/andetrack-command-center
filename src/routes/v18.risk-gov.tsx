import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const r = H.usePredictiveRiskGovernance();
  return (
    <V18Page icon={<AlertTriangle className="size-6 text-violet-300" />} title="Predictive Risk Governance Center"
      blurb="15 risk categories with owner, coverage, and evidence health. All mitigation routed for human approval.">
      <ScoreCard label="Risk governance" value={r.score} tone="violet" />
      <Section title="Risk matrix">
        <SimpleTable rows={r.matrix as any} columns={[
          { key: "category", label: "Category" }, { key: "owner", label: "Owner" },
          { key: "coverage", label: "Coverage" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/risk-gov")({ component: Page });
