import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V19Page } from "@/components/v19/V19Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v19/ui-bits";
import * as H from "@/v19/hooks";

function Page() {
  const h = H.useV19Headline();
  const os = H.useEnterpriseAssuranceOperatingSystem();
  const edge = H.useV19EdgeBoundary();
  const rls = H.useV19Rls();
  const guards = H.useV19Guardrails();
  const roadmap = H.useEnterpriseAssuranceRoadmap();
  const teaser = H.useV19Phase52Teaser();
  return (
    <V19Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V19 — Enterprise Assurance Operating System"
      blurb="Mock-only. Board-ready enterprise logistics assurance OS. Autonomous-assist workflows, revenue/MP/capital controls, evidence, recs, approvals, outcomes and audits governed through one mature assurance OS. No autonomous dispatch.">
      <ExecHeadline tag="V19 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise assurance" value={os.score} tone="violet" />
        <ScoreCard label="Resilience maturity" value="94%" tone="emerald" />
        <ScoreCard label="Board execution" value="93%" tone="sky" />
        <ScoreCard label="Audit execution" value="96%" tone="amber" />
      </div>
      <Section title="ServerFn · Edge · /api/public boundary (V19)">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (V19)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Long-term roadmap horizons">
        <SimpleTable rows={roadmap.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Guardrails">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/overview")({ component: Page });
