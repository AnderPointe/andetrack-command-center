import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V235Page } from "@/components/v235/V235Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v235/ui-bits";
import * as H from "@/v235/hooks";

function Page() {
  const head = H.useV235Headline();
  const m = H.useEnterpriseTrustAutomationMaturity();
  const feat = H.useV235FeatureMatrix();
  const rls = H.useV235Rls();
  const edge = H.useV235Edge();
  const guard = H.useV235Guardrails();
  const demo = H.useV235Demo();
  const roadmap = H.useTrustAutomationMaturityRoadmap();
  const teaser = H.useV235Phase61Teaser();
  return (
    <V235Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V23.5 — Enterprise Trust Automation Maturity"
      blurb="20 trust automation centers optimized to enterprise maturity. All high-impact actions HITL-gated; approver ≠ recommender, dual sign-off > $25k, append-only hash-chained evidence — enforced in RLS + server fns.">
      <ExecHeadline tag="V23.5 headline" headline={head.headline} bullets={head.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Maturity"           value={m.score} tone="emerald" />
        <ScoreCard label="Customer optim"     value={H.useCustomerIntelligenceOptimization().score} tone="emerald" />
        <ScoreCard label="Partner optim"      value={H.usePartnerIntelligenceOptimization().score} tone="emerald" />
        <ScoreCard label="Board maturity"     value={H.useBoardAutomationAssuranceMaturity().score} tone="emerald" />
        <ScoreCard label="Revenue optim"      value={H.useRevenueAutomationTrustOptimization().score} tone="emerald" />
        <ScoreCard label="MP scale"           value={H.useMarketplaceAutomationTrustScale().score} tone="emerald" />
        <ScoreCard label="Evidence maturity"  value={H.useTrustEvidenceAutomationMaturity().score} tone="emerald" />
        <ScoreCard label="Approval maturity"  value={H.useHumanApprovalAutomationMaturity().score} tone="emerald" />
      </div>
      <Section title="V23.5 feature matrix">
        <SimpleTable rows={feat as any} columns={[{ key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" }]} />
      </Section>
      <Section title="Invariants"><ul className="space-y-1 text-sm text-muted-foreground">{guard.map((g, i) => <li key={i}>• {g}</li>)}</ul></Section>
      <Section title="RLS policies (V23.5)">
        <SimpleTable rows={rls as any} columns={[{ key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" }]} />
      </Section>
      <Section title={`Server functions vs public routes — ${edge.rule}`}>
        <SimpleTable rows={edge.serverfn as any} columns={[{ key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" }]} />
        <div className="mt-3">
          <SimpleTable rows={edge.edge_routes as any} columns={[{ key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" }]} />
        </div>
      </Section>
      <Section title="Long-term trust automation maturity roadmap">
        <SimpleTable rows={roadmap.horizons as any} columns={[{ key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }]} />
      </Section>
      <Section title="V23.5 demo flow">
        <SimpleTable rows={demo as any} columns={[{ key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" }]} />
      </Section>
      <Section title={`Phase 61 teaser — ${teaser.version} (not started)`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V235Page>
  );
}
export const Route = createFileRoute("/v235/overview")({ component: Page });
