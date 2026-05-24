import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V23Page } from "@/components/v23/V23Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v23/ui-bits";
import * as H from "@/v23/hooks";

function Page() {
  const head = H.useV23Headline();
  const op = H.useEnterpriseTrustAutomationOperating();
  const feat = H.useV23FeatureMatrix();
  const roadmap = H.useTrustAutomationOperatingRoadmap();
  const teaser = H.useV23Phase60Teaser();

  // Phase 59 polish
  const pDomains  = H.useV23PolishDomains();
  const pQueue    = H.useV23PolishHitlQueue();
  const pBoundary = H.useV23PolishBoundary();
  const pRls      = H.useV23PolishRls();
  const pEdge     = H.useV23PolishEdge();
  const pInv      = H.useV23PolishInvariants();
  const pDemo     = H.useV23PolishDemo();
  const pOwners   = H.useV23PolishOwnerHeatmap();
  const pLanes    = H.useV23PolishRoadmapLanes();

  return (
    <V23Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V23 — Enterprise Trust Automation Operating Network"
      blurb="21 trust automation centers operating as one network, polished. All high-impact actions HITL-gated; approver ≠ recommender, dual sign-off > $25k, append-only hash-chained evidence — enforced in RLS + server fns, not UI.">
      <ExecHeadline tag="V23 polish headline" headline={head.headline} bullets={head.highlights} />

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

      <Section title="V23 domain uplift — before → after (Phase 59 polish)">
        <SimpleTable rows={pDomains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "before", label: "Before" }, { key: "after", label: "After" },
          { key: "owner", label: "Owner" }, { key: "note", label: "Note" },
        ]} />
      </Section>

      <Section title="Live HITL approval queue (sample)">
        <SimpleTable rows={pQueue as any} columns={[
          { key: "id", label: "#" }, { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "recommender", label: "Recommender" }, { key: "approver", label: "Approver" },
          { key: "sla", label: "SLA" }, { key: "status", label: "Status" },
        ]} />
      </Section>

      <Section title="Trust automation boundary controls">
        <SimpleTable rows={pBoundary as any} columns={[
          { key: "surface", label: "Surface" }, { key: "control", label: "Control" },
          { key: "owner", label: "Owner" }, { key: "state", label: "State" },
        ]} />
      </Section>

      <Section title="Invariants (enforced server-side)">
        <ul className="space-y-1 text-sm text-muted-foreground">{pInv.map((g, i) => <li key={i}>• {g}</li>)}</ul>
      </Section>

      <Section title="RLS policies (V23, polished)">
        <SimpleTable rows={pRls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title={`Server functions vs public routes — ${pEdge.rule}`}>
        <SimpleTable rows={pEdge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={pEdge.edge_routes as any} columns={[
            { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
          ]} />
        </div>
      </Section>

      <Section title="Owner heatmap">
        <SimpleTable rows={pOwners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "domains", label: "Domains" }, { key: "attention", label: "Attention" },
        ]} />
      </Section>

      <Section title="Long-term trust automation operating roadmap (lanes × quarters)">
        <SimpleTable rows={pLanes as any} columns={[
          { key: "lane", label: "Lane" }, { key: "q1", label: "Q1" }, { key: "q2", label: "Q2" },
          { key: "q3", label: "Q3" }, { key: "q4", label: "Q4" },
        ]} />
        <div className="mt-3">
          <SimpleTable rows={roadmap.horizons as any} columns={[
            { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
          ]} />
        </div>
      </Section>

      <Section title="V23 polished demo flow (17 steps)">
        <SimpleTable rows={pDemo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Actor" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="V23 feature matrix">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title={`Phase 60 teaser — ${teaser.version} (not started)`}>
        <ul className="space-y-1 text-sm text-muted-foreground">{teaser.themes.map((t, i) => <li key={i}>• {t}</li>)}</ul>
      </Section>
    </V23Page>
  );
}
export const Route = createFileRoute("/v23/overview")({ component: Page });
