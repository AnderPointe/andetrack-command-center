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
  const polish = H.useV19PolishHeadlines();
  const depth = H.useV19AreaDepth();
  const freshness = H.useV19EvidenceFreshness();
  const personas = H.useV19PersonaSlas();
  const edgeP = H.useV19EdgeBoundaryPolish();
  const rlsP = H.useV19RlsExamplesPolish();
  const invariants = H.useV19Invariants();
  const guardsP = H.useV19GuardrailsPolish();
  return (
    <V19Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V19 — Enterprise Assurance Operating System"
      blurb="Mock-only. Polished V19: deeper area KPIs, owner heatmap, evidence freshness, persona SLAs, RLS + Edge boundaries. No autonomous dispatch.">
      <ExecHeadline tag="V19 polish headline" headline={polish.headline} bullets={polish.highlights} />
      <ExecHeadline tag="V19 base headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise assurance" value={os.score} tone="violet" />
        <ScoreCard label="Resilience maturity" value="94.6%" tone="emerald" />
        <ScoreCard label="Board execution" value="100%" tone="sky" />
        <ScoreCard label="Audit execution" value="100%" tone="amber" />
      </div>
      <Section title="Area depth — KPI / SLA / status (polish)">
        <SimpleTable rows={depth as any} columns={[
          { key: "area", label: "Area" }, { key: "kpi", label: "KPI" },
          { key: "value", label: "Value" }, { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Evidence freshness (insert-only)">
        <SimpleTable rows={freshness as any} columns={[
          { key: "kind", label: "Kind" }, { key: "freshness", label: "Freshness" }, { key: "oldest", label: "Oldest" },
        ]} />
      </Section>
      <Section title="Persona SLAs">
        <SimpleTable rows={personas as any} columns={[
          { key: "persona", label: "Persona" }, { key: "surface", label: "Surface" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="ServerFn · Edge · /api/public boundary (polish)">
        <SimpleTable rows={edgeP as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="ServerFn · Edge · /api/public boundary (base)">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (polish)">
        <SimpleTable rows={rlsP as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="RLS policy examples (base)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="V19 invariants (mock policy enforcement)">
        <ul className="text-sm text-muted-foreground">{invariants.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Long-term roadmap horizons">
        <SimpleTable rows={roadmap.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Guardrails (polish)">
        <ul className="text-sm text-muted-foreground">{guardsP.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Guardrails (base)">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V19Page>
  );
}
export const Route = createFileRoute("/v19/overview")({ component: Page });
