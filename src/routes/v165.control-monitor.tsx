import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const c = H.usePredictiveControlMonitoring();
  return (
    <V165Page icon={<Activity className="size-6 text-emerald-300" />} title="Predictive Control Monitoring Center"
      blurb="Per-category control health, predictive alerts, owners, remediation, and outcome tracking.">
      <ScoreCard label="Control monitoring score" value={c.score} tone="emerald" />
      <Section title="Control matrix">
        <SimpleTable rows={c.matrix as any} columns={[
          { key: "category", label: "Category" }, { key: "health", label: "Health" }, { key: "owner", label: "Owner" }, { key: "alert", label: "Alert" },
        ]} />
      </Section>
      <Section title="Remediation">
        <SimpleTable rows={c.remediation as any} columns={[
          { key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Outcomes">
        <SimpleTable rows={c.outcomes as any} columns={[
          { key: "control", label: "Control" }, { key: "improved", label: "Improvement" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/control-monitor")({ component: Page });
