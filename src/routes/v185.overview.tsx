import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V185Page } from "@/components/v185/V185Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v185/ui-bits";
import * as H from "@/v185/hooks";

function Page() {
  const h = H.useV185Headline();
  const a = H.useEnterpriseControlAssurance();
  const edge = H.useV185EdgeBoundary();
  const rls = H.useV185Rls();
  const guards = H.useV185Guardrails();
  const horizons = H.useControlAssuranceRoadmap();
  const teaser = H.useV185Phase51Teaser();
  const headlines = H.useV185PolishHeadlines();
  const freshness = H.useV185EvidenceFreshness();
  const rls2 = H.useV185RlsExamples2();
  const edge2 = H.useV185EdgeBoundary2();
  const slas = H.useV185PersonaSlas();
  const invariants = H.useV185Invariants();
  const depth = H.useV185AreaDepth();
  const guards2 = H.useV185GuardrailsPolish();
  return (
    <V185Page icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Anderoute V18.5 — Enterprise Control Assurance"
      blurb="Mock-only. Resilient, controlled, board-ready enterprise logistics intelligence. Autonomous-assist workflows are continuously monitored, policy-enforced, evidence-backed, human-approved, audited, and resilient.">
      <ExecHeadline tag="V18.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Control assurance" value={a.score} tone="violet" />
        <ScoreCard label="Operating resilience" value="93%" tone="emerald" />
        <ScoreCard label="Human approval" value="96%" tone="amber" />
        <ScoreCard label="Audit completeness" value="95%" tone="sky" />
      </div>
      <Section title="Polish headlines by area">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" }, { key: "headline", label: "Headline" }, { key: "kpi", label: "KPI" },
        ]} />
      </Section>
      <Section title="Area depth (KPIs · SLA)">
        <SimpleTable rows={depth.map(d => ({ ...d, kpis: d.kpis.join(" · ") })) as any} columns={[
          { key: "area", label: "Area" }, { key: "kpis", label: "KPIs" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Evidence freshness by category">
        <SimpleTable rows={freshness as any} columns={[
          { key: "category", label: "Category" }, { key: "median_age", label: "Median age" }, { key: "stale_pct", label: "Stale %" },
        ]} />
      </Section>
      <Section title="Persona SLAs">
        <SimpleTable rows={slas as any} columns={[
          { key: "persona", label: "Persona" }, { key: "review", label: "Review" },
          { key: "approval", label: "Approval" }, { key: "channel", label: "Channel" },
        ]} />
      </Section>
      <Section title="ServerFn · Edge · /api/public boundary (V18.5)">
        <SimpleTable rows={edge2 as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="Original boundary (kept for reference)">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (V18.5 polish)">
        <SimpleTable rows={rls2 as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="RLS policy examples (base)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Invariants">
        <ul className="text-sm text-muted-foreground">{invariants.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Long-term roadmap horizons">
        <SimpleTable rows={horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Guardrails (polish)">
        <ul className="text-sm text-muted-foreground">{guards2.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Guardrails (base)">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V185Page>
  );
}
export const Route = createFileRoute("/v185/overview")({ component: Page });

