import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const h = H.useV18Headline();
  const g = H.useAutonomousAssistScaleGovernance();
  const edge = H.useV18EdgeBoundary();
  const rls = H.useV18Rls();
  const guards = H.useV18Guardrails();
  const teaser = H.useV18Phase50Teaser();
  return (
    <V18Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V18 — Enterprise Autonomous-Assist Scale Governance"
      blurb="Mock-only. Automation governance scales across revenue, marketplace, capital, board, accounts, partners, products, and category. Every high-impact action is human-approved, explainable, auditable, controlled, and evidence-backed.">
      <ExecHeadline tag="V18 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Assist scale governance" value={g.score} tone="violet" />
        <ScoreCard label="Human approval coverage" value="96%" tone="emerald" />
        <ScoreCard label="Recommendation quality" value="89%" tone="amber" />
        <ScoreCard label="Audit completeness" value="94%" tone="sky" />
      </div>
      <Section title="ServerFn · Edge Function · /api/public boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },   { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (V18)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Guardrails">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/overview")({ component: Page });
