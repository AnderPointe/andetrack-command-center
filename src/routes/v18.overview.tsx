import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V18Page } from "@/components/v18/V18Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v18/ui-bits";
import * as H from "@/v18/hooks";

function Page() {
  const h = H.useV18Headline();
  const g = H.useAutonomousAssistScaleGovernance();
  const edge = H.useV18EdgeBoundaryPolish();
  const rls = H.useV18RlsPolish();
  const guards = H.useV18GuardrailsPolish();
  const teaser = H.useV18Phase50TeaserPolish();
  const headlines = H.useV18PolishHeadlines();
  const fresh = H.useV18EvidenceFreshness();
  const horizons = H.useV18RoadmapHorizons();
  const depth = H.useV18AreaDepth();
  const slas = H.useV18PersonaSlas();
  const invariants = H.useV18Invariants();
  const rls2 = H.useV18RlsPolish2();
  const edge2 = H.useV18EdgeBoundary2();
  return (
    <V18Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V18 — Enterprise Autonomous-Assist Scale Governance"
      blurb="Mock-only. Automation governance scales across revenue, marketplace, capital, board, accounts, partners, products, and category. Every high-impact action is human-approved, explainable, auditable, controlled, and evidence-backed.">
      <ExecHeadline tag="V18 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Assist scale governance" value={g.score} tone="violet" />
        <ScoreCard label="Human approval coverage" value="96%" tone="emerald" />
        <ScoreCard label="Recommendation quality" value="89%" tone="amber" />
        <ScoreCard label="Audit completeness" value="95%" tone="sky" />
      </div>
      <Section title="Polish headlines (20 areas)">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" }, { key: "headline", label: "Headline" }, { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="Evidence freshness by category">
        <SimpleTable rows={fresh as any} columns={[
          { key: "category", label: "Category" }, { key: "freshness", label: "Fresh" }, { key: "stale", label: "Stale" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
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
      <Section title="Long-term roadmap horizons">
        <SimpleTable rows={horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
      <Section title="Area depth (20 areas × 4 KPIs + SLA)">
        <SimpleTable rows={depth as any} columns={[
          { key: "area", label: "Area" }, { key: "kpi1", label: "KPI 1" }, { key: "kpi2", label: "KPI 2" },
          { key: "kpi3", label: "KPI 3" }, { key: "kpi4", label: "KPI 4" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Persona review & approval SLAs">
        <SimpleTable rows={slas as any} columns={[
          { key: "persona", label: "Persona" }, { key: "review_sla", label: "Review" },
          { key: "approval_sla", label: "Approval" }, { key: "backup", label: "Backup" }, { key: "scope", label: "Scope" },
        ]} />
      </Section>
      <Section title="Additional RLS policy examples">
        <SimpleTable rows={rls2 as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Additional Edge / ServerFn / public boundary">
        <SimpleTable rows={edge2 as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="Invariants">
        <ul className="text-sm text-muted-foreground">{invariants.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Guardrails">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V18Page>
  );
}
export const Route = createFileRoute("/v18/overview")({ component: Page });
