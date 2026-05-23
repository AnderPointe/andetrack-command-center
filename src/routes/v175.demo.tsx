import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const steps = H.useV175Demo();
  return (
    <V175Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V17.5 Demo Flow"
      blurb="13-step persona walkthrough proving governed automation scale is operational and no high-impact action executes without a human approver who is not the recommender.">
      <Section title="Persona walkthrough">
        <SimpleTable rows={steps as any} columns={[
          { key: "step", label: "#" }, { key: "actor", label: "Actor" }, { key: "surface", label: "Surface" },
          { key: "action", label: "Action" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">
        Acceptance: all 25 V17.5 surfaces reachable under <code>/v175/*</code>. RLS
        <code> v175_high_impact_human_approval</code>, <code>v175_board_report_approved_only</code>, and
        <code> v175_customer_no_internal_read</code> enforced.
      </p>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/demo")({ component: Page });
