import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const c = H.useAutomationControlMaturity();
  return (
    <V175Page icon={<Activity className="size-6 text-emerald-300" />} title="Automation Control Maturity Center"
      blurb="Control matrix across human approval, recommendations, evidence, audit logging, risk/confidence thresholds, and per-domain automation controls.">
      <ScoreCard label="Automation control maturity" value={c.score} tone="emerald" />
      <Section title="Control matrix">
        <SimpleTable rows={c.matrix as any} columns={[
          { key: "control", label: "Control" }, { key: "status", label: "Status" },
          { key: "exceptions", label: "Exceptions" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Control testing calendar">
        <SimpleTable rows={c.calendar as any} columns={[
          { key: "control", label: "Control" }, { key: "test_date", label: "Test date" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Control exception queue">
        <SimpleTable rows={c.exceptions as any} columns={[
          { key: "id", label: "ID" }, { key: "control", label: "Control" }, { key: "desc", label: "Description" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Control remediation tracker">
        <SimpleTable rows={c.remediation as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" },
          { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status" },
        ]} />
      </Section>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/control-maturity")({ component: Page });
