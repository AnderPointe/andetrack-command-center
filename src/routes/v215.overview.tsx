import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const head = H.useV215Headline();
  const scale = H.useEnterpriseTrustNetworkScale();
  const rls = H.useV215Rls();
  const edge = H.useV215Edge();
  const guard = H.useV215Guardrails();
  const demo = H.useV215Demo();
  const roadmap = H.useTrustNetworkScaleRoadmap();
  const teaser = H.useV215Phase57Teaser();

  return (
    <V215Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V21.5 — Enterprise Trust Network Scale"
      blurb="Lifecycle-driven trust at scale across customer, partner, board, revenue, marketplace, evidence, boundaries, risk, audit, approvals, recs, outcomes, capital, products, categories, and exceptions. Every high-impact action HITL-gated.">
      <ExecHeadline tag="V21.5 headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust network scale" value={scale.score} tone="emerald" />
        <ScoreCard label="Customer lifecycle" value={95} tone="emerald" />
        <ScoreCard label="Partner lifecycle" value={93} tone="emerald" />
        <ScoreCard label="Board maturity" value={95} tone="emerald" />
      </div>

      <Section title="Server boundary — ServerFn vs /api/public/*">
        <SimpleTable rows={edge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <SimpleTable rows={edge.edge_routes as any} columns={[
          { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
        ]} />
      </Section>

      <Section title="RLS policy examples">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title="Invariants (enforced)">
        <ul className="text-sm text-muted-foreground">{guard.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>

      <Section title="V21.5 demo flow (12 steps, persona-driven)">
        <SimpleTable rows={demo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="Long-term trust network scale roadmap">
        <SimpleTable rows={roadmap.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>

      <Section title="Phase 57 teaser (deferred)">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/overview")({ component: Page });
