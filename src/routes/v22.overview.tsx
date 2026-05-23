import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";

function Page() {
  const head = H.useV22Headline();
  const op = H.useEnterpriseTrustLifecycleOperating();
  const feat = H.useV22FeatureMatrix();
  const rls = H.useV22Rls();
  const edge = H.useV22Edge();
  const guard = H.useV22Guardrails();
  const demo = H.useV22Demo();
  const roadmap = H.useTrustLifecycleRoadmap();
  const teaser = H.useV22Phase58Teaser();
  return (
    <V22Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V22 — Enterprise Trust Lifecycle Operating System"
      blurb="Lifecycle-governed trust across customer, partner, board, revenue, marketplace, evidence, approval, recommendation, outcome, audit, risk, capital, product, category, and exception domains. All high-impact actions HITL-gated.">
      <ExecHeadline tag="V22 headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating score"        value={op.score}                                      tone="emerald" />
        <ScoreCard label="Customer automation"    value={H.useCustomerTrustAutomationGovernance().score} tone="emerald" />
        <ScoreCard label="Partner automation"     value={H.usePartnerTrustAutomationGovernance().score}  tone="emerald" />
        <ScoreCard label="Board exec"             value={H.useBoardTrustMaturityExecution().score}       tone="emerald" />
      </div>

      <Section title="V22 feature matrix">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title="Server boundary — ServerFn vs /api/public/*">
        <p className="text-xs text-muted-foreground mb-2">{edge.rule}</p>
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

      <Section title="V22 demo flow (persona-driven)">
        <SimpleTable rows={demo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="Long-term trust lifecycle operating roadmap">
        <SimpleTable rows={roadmap.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>

      <Section title="Phase 58 (deferred)">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
      </Section>
    </V22Page>
  );
}
export const Route = createFileRoute("/v22/overview")({ component: Page });
