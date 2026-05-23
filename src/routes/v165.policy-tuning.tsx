import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable, KpiGrid } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const t = H.useOutcomeBasedPolicyTuning();
  return (
    <V165Page icon={<Settings2 className="size-6 text-emerald-300" />} title="Outcome-Based Policy Tuning"
      blurb="Per-policy approval/rejection rate, calibration, threshold suggestions, and policy owner approval workflow.">
      <KpiGrid cols={4} items={[
        { label: "False positive", value: t.outcome_analytics.fp_pct },
        { label: "False negative", value: t.outcome_analytics.fn_pct },
        { label: "Within ±10%", value: t.outcome_analytics.within_10 },
        { label: "Within ±20%", value: t.outcome_analytics.within_20 },
      ]} />
      <Section title="Tuning suggestions">
        <SimpleTable rows={t.suggestions as any} columns={[
          { key: "area", label: "Area" }, { key: "approval_rate", label: "Appr rate" }, { key: "rejection", label: "Rej rate" },
          { key: "calibration", label: "Calibration" }, { key: "suggestion", label: "Suggestion" }, { key: "approver", label: "Approver" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="Audit trail">
        <SimpleTable rows={t.audit_trail as any} columns={[
          { key: "ts", label: "When" }, { key: "area", label: "Area" }, { key: "change", label: "Change" }, { key: "approver", label: "Approver" },
        ]} />
      </Section>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/policy-tuning")({ component: Page });
