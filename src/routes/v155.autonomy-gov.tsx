import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const g = H.useV155AutonomyGov();
  return (
    <V155Page icon={<ShieldCheck className="size-6 text-fuchsia-300" />}
      title="Autonomous-Assist Governance"
      blurb="V15.5 posture is assist-only. Autonomous dispatch is OFF and not buildable in this phase.">
      <div className="rounded-lg border border-amber-400/30 bg-amber-500/5 p-3 text-sm">
        <strong className="text-amber-200">Posture:</strong> <span className="text-foreground">{g.posture}</span>
      </div>
      <Section title="Rules">
        <SimpleTable rows={g.rules as any} columns={[
          { key: "rule", label: "Rule" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "enforced" ? "healthy" : "in_progress"} /> },
        ]} />
      </Section>
      <Section title="Guardrails">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {g.guardrails.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/autonomy-gov")({ component: Page });
