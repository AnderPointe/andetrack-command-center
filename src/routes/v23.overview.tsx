import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V23Page } from "@/components/v23/V23Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v23/ui-bits";
import * as H from "@/v23/hooks";

function Page() {
  const head = H.useV23Headline();
  const op = H.useEnterpriseTrustAutomationOperating();
  const feat = H.useV23FeatureMatrix();
  const rls = H.useV23Rls();
  const edge = H.useV23Edge();
  const guard = H.useV23Guardrails();
  const demo = H.useV23Demo();
  const roadmap = H.useTrustAutomationOperatingRoadmap();
  const teaser = H.useV23Phase60Teaser();

  return (
    <V23Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V23 — Enterprise Trust Automation Operating Network"
      blurb="21 trust automation centers operating as one network. All high-impact actions HITL-gated. Approver ≠ recommender, dual sign-off > $25k, append-only evidence — enforced in RLS + server fns, not UI.">
      <ExecHeadline tag="V23 headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating network"   value={op.score} tone="emerald" />
        <ScoreCard label="Customer intel"      value={H.useCustomerLifecycleIntelligenceScale().score} tone="emerald" />
        <ScoreCard label="Partner intel"       value={H.usePartnerLifecycleIntelligenceScale().score} tone="emerald" />
        <ScoreCard label="Board assurance"     value={H.useBoardTrustAssuranceExecution().score} tone="emerald" />
        <ScoreCard label="Revenue auto"        value={H.useRevenueTrustAutomationSystems().score} tone="emerald" />
        <ScoreCard label="MP auto gov"         value={H.useMarketplaceTrustAutomationGovernance().score} tone="emerald" />
        <ScoreCard label="Evidence network"    value={H.useTrustEvidenceAutomationNetwork().score} tone="emerald" />
        <ScoreCard label="Approval gov"        value={H.useHumanApprovalAutomationGovernance().score} tone="emerald" />
      </div>

      <Section title="V23 feature matrix">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title="Invariants">
        <ul className="space-y-1 text-sm text-muted-foreground">{guard.map((g, i) => <li key={i}>• {g}</li>)}</ul>
      </Section>

      <Section title="RLS policies (V23)">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title={`Server functions vs public routes — ${edge.rule}`}>
        <SimpleTable rows={edge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={edge.edge_routes as any} columns={[
            { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
          ]} />
        </div>
      </Section>

      <Section title="Long-term trust automation operating roadmap">
        <SimpleTable rows={roadmap.horizons as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>

      <Section title="V23 demo flow">
        <SimpleTable rows={demo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title={`Phase 60 teaser — ${teaser.version}`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V23Page>
  );
}
export const Route = createFileRoute("/v23/overview")({ component: Page });
