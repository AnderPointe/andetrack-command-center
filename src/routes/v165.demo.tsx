import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const steps = H.useV165Demo();
  return (
    <V165Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V16.5 Demo Flow"
      blurb="12-step persona walkthrough proving predictive governance is operational and no high-impact action executes without human approval.">
      <Section title="Persona walkthrough">
        <SimpleTable rows={steps as any} columns={[
          { key: "step", label: "#" }, { key: "actor", label: "Actor" }, { key: "surface", label: "Surface" },
          { key: "action", label: "Action" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">
        Acceptance: all 25 V16.5 surfaces reachable under <code>/v165/*</code>. RLS <code>automation_no_self_approve</code> + <code>automation_evidence_required</code> enforced on every approval.
      </p>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/demo")({ component: Page });
