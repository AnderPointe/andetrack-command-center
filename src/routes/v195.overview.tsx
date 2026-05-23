import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V195Page } from "@/components/v195/V195Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v195/ui-bits";
import * as H from "@/v195/hooks";

function Page() {
  const h = H.useV195Headline();
  const ph = H.useV195PolishHeadlines();
  const m = H.useEnterpriseAssuranceMaturity();
  const edge = H.useV195EdgeBoundary();
  const edgeP = H.useV195EdgeBoundaryPolish();
  const rls = H.useV195Rls();
  const rlsP = H.useV195RlsExamplesPolish();
  const guards = H.useV195Guardrails();
  const guardsP = H.useV195GuardrailsPolish();
  const roadmap = H.useAssuranceMaturityRoadmap();
  const teaser = H.useV195Phase53Teaser();
  const depth = H.useV195AreaDepth();
  const evid = H.useV195EvidenceFreshness();
  const slas = H.useV195PersonaSlas();
  const inv = H.useV195Invariants();
  return (
    <V195Page icon={<ShieldCheck className="size-6 text-violet-300" />}
      title="Anderoute V19.5 — Enterprise Assurance Maturity Optimization"
      blurb="Mock-only. Board-ready assurance maturity: autonomous-assist optimized, board intelligence, revenue/MP/capital optimized, evidence, audit, recommendations, approvals, outcomes, exceptions — all HITL on every high-impact action.">
      <ExecHeadline tag="V19.5 polish headline" headline={ph.headline} bullets={ph.highlights} />
      <ExecHeadline tag="V19.5 base headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise maturity" value={ph.score} tone="violet" />
        <ScoreCard label="Resilience opt"      value="96.4%" tone="emerald" />
        <ScoreCard label="Board intelligence"  value="95.1%" tone="sky" />
        <ScoreCard label="Audit optimization"  value="97.7%" tone="amber" />
      </div>
      <Section title="20-domain assurance depth (KPI · SLA · status)">
        <SimpleTable rows={depth as any} columns={[
          { key: "area", label: "Area" }, { key: "kpi", label: "KPI" },
          { key: "target", label: "Target" }, { key: "actual", label: "Actual" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Evidence freshness (polish)">
        <SimpleTable rows={evid as any} columns={[
          { key: "source", label: "Source" }, { key: "freshness", label: "Freshness" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>
      <Section title="Persona SLAs">
        <SimpleTable rows={slas as any} columns={[
          { key: "persona", label: "Persona" }, { key: "sla", label: "SLA" }, { key: "channel", label: "Channel" },
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
      <Section title="V19.5 invariants">
        <ul className="text-sm text-muted-foreground">{inv.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Long-term assurance maturity horizons">
        <SimpleTable rows={roadmap.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="Guardrails (polish)">
        <ul className="text-sm text-muted-foreground">{guardsP.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <Section title="Guardrails (base)">
        <ul className="text-sm text-muted-foreground">{guards.map(x => <li key={x}>· {x}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V195Page>
  );
}
export const Route = createFileRoute("/v195/overview")({ component: Page });
