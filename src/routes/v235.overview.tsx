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
  const pDomains = H.useV235PolishDomains();
  const pHitl = H.useV235PolishHitlQueue();
  const pBoundary = H.useV235PolishBoundary();
  const pInv = H.useV235PolishInvariants();
  const pRls = H.useV235PolishRls();
  const pEdge = H.useV235PolishEdge();
  const pOwners = H.useV235PolishOwnerHeatmap();
  const pLanes = H.useV235PolishRoadmapLanes();
  const pDemo = H.useV235PolishDemo();
  return (
    <V235Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V23.5 — Enterprise Trust Automation Maturity"
      blurb="Phase 60 polish — 20 trust automation centers lifted to 99 maturity. HITL-gated, approver ≠ recommender, dual sign-off > $25k, append-only hash-chained evidence — enforced in RLS + server fns.">

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
      <Section title="Phase 60 polish — domain uplift">
        <SimpleTable rows={pDomains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "before", label: "Before" },
          { key: "after", label: "After" }, { key: "uplift", label: "Uplift" },
        ]} />
      </Section>
      <Section title="Polish — sample HITL queue (approver ≠ recommender)">
        <SimpleTable rows={pHitl as any} columns={[
          { key: "id", label: "ID" }, { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "recommender", label: "Recommender" }, { key: "approver", label: "Approver" },
          { key: "risk", label: "Risk" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>
      <Section title="Polish — boundary controls">
        <SimpleTable rows={pBoundary as any} columns={[
          { key: "scope", label: "Scope" }, { key: "rule", label: "Rule" }, { key: "evidence", label: "Evidence" },
        ]} />
      </Section>
      <Section title="Polish — enforced invariants">
        <ul className="space-y-1 text-sm text-muted-foreground">{pInv.map((g, i) => <li key={i}>• {g}</li>)}</ul>
      </Section>
      <Section title="Polish — expanded RLS policies (V23.5)">
        <SimpleTable rows={pRls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>
      <Section title={`Polish — ServerFn vs public route split — ${pEdge.rule}`}>
        <SimpleTable rows={pEdge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={pEdge.edge_routes as any} columns={[
            { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
          ]} />
        </div>
      </Section>
      <Section title="Polish — owner coverage heatmap">
        <SimpleTable rows={pOwners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "coverage", label: "Coverage %" },
          { key: "gaps", label: "Gaps" }, { key: "sla_p95_h", label: "SLA p95 (h)" },
        ]} />
      </Section>
      <Section title="Polish — lanes × quarters roadmap">
        <SimpleTable rows={pLanes as any} columns={[
          { key: "lane", label: "Lane" }, { key: "q1", label: "Q1" }, { key: "q2", label: "Q2" },
          { key: "q3", label: "Q3" }, { key: "q4", label: "Q4" },
        ]} />
      </Section>
      <Section title="Polish — 20-step V23.5 demo flow">
        <SimpleTable rows={pDemo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>
      <Section title={`Phase 61 teaser — ${teaser.version} (not started)`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V235Page>
  );
}
export const Route = createFileRoute("/v235/overview")({ component: Page });
