import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const h = H.useV195Headline();
  const m = H.useEnterpriseAssuranceMaturity();
  const edge = H.useV195EdgeBoundary();
  const rls = H.useV195Rls();
  const guards = H.useV195Guardrails();
  const roadmap = H.useAssuranceMaturityRoadmap();
  const teaser = H.useV195Phase53Teaser();
  return (
    <V195Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V19.5 — Enterprise Assurance Maturity Optimization"
      blurb="Mock-only. Board-ready assurance maturity: autonomous-assist optimized, board intelligence, revenue/MP/capital optimized, evidence, audit, recommendations, approvals, outcomes, exceptions — all HITL on every high-impact action.">
      <ExecHeadline tag="V19.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise maturity" value={m.score} tone="violet" />
        <ScoreCard label="Resilience opt"      value="95%" tone="emerald" />
        <ScoreCard label="Board intelligence"  value="94%" tone="sky" />
        <ScoreCard label="Audit optimization"  value="97%" tone="amber" />
      </div>
      <Section title="ServerFn · Edge · /api/public boundary (V19.5)">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (V19.5)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Long-term assurance maturity horizons">
        <SimpleTable rows={roadmap.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Guardrails">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/overview")({ component: Page });
