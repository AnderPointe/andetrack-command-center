import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const polish = H.useV16DemoFlowPolish();
  const roadmap = H.useV16RoadmapPolish();
  return (
    <V16Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V16 Demo Flow — Polish"
      blurb="10-step persona walkthrough proving autonomous-assist governance is operational and no high-impact action executes without human approval.">
      <Section title="Persona walkthrough">
        <SimpleTable rows={polish as any} columns={[
          { key: "step", label: "#" },
          { key: "actor", label: "Actor" },
          { key: "surface", label: "Surface" },
          { key: "action", label: "Action" },
          { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="Roadmap horizons (autonomous dispatch held)">
        <SimpleTable rows={roadmap as any} columns={[
          { key: "horizon", label: "Horizon" },
          { key: "theme", label: "Theme" },
          { key: "status", label: "Status" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">
        All 10 steps reachable under <code>/v16/*</code>. RLS <code>rec_no_self_approve</code> + <code>evidence_attached_required</code> enforced across approvals.
      </p>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/demo")({ component: Page });
