import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V22Page } from "@/components/v22/V22Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v22/ui-bits";
import * as H from "@/v22/hooks";

function Page() {
  const head = H.useV22Headline();
  const polishHead = H.useV22PolishHeadline();
  const op = H.useEnterpriseTrustLifecycleOperating();
  const feat = H.useV22FeatureMatrix();
  const rls = H.useV22Rls();
  const edge = H.useV22Edge();
  const guard = H.useV22Guardrails();
  const demo = H.useV22Demo();
  const roadmap = H.useTrustLifecycleRoadmap();
  const teaser = H.useV22Phase58Teaser();

  const pDomains   = H.useV22PolishDomains();
  const pHitl      = H.useV22PolishHitlQueue();
  const pBoundary  = H.useV22PolishBoundary();
  const pRls       = H.useV22PolishRls();
  const pEdge      = H.useV22PolishEdge();
  const pInv       = H.useV22PolishInvariants();
  const pDemo      = H.useV22PolishDemo();
  const pRoadmap   = H.useV22PolishRoadmap();
  const pOwner     = H.useV22PolishOwnerHeatmap();

  return (
    <V22Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V22 — Enterprise Trust Lifecycle Operating System (Polished)"
      blurb="Lifecycle-governed trust across 21 domains. All high-impact actions HITL-gated. Approver ≠ recommender, dual sign-off > $25k, append-only evidence — enforced in middleware, not UI.">
      <ExecHeadline tag="V22 polish" headline={polishHead.headline} bullets={polishHead.highlights} />
      <ExecHeadline tag="V22 headline" headline={head.headline} bullets={head.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Operating score"        value={op.score}                                      tone="emerald" />
        <ScoreCard label="Customer automation"    value={H.useCustomerTrustAutomationGovernance().score} tone="emerald" />
        <ScoreCard label="Partner automation"     value={H.usePartnerTrustAutomationGovernance().score}  tone="emerald" />
        <ScoreCard label="Board exec"             value={H.useBoardTrustMaturityExecution().score}       tone="emerald" />
      </div>

      <Section title="Lifecycle domain uplift (before → after)">
        <SimpleTable rows={pDomains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "before", label: "Before" }, { key: "after", label: "After" },
          { key: "owner", label: "Owner" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title="HITL approval queue (live)">
        <SimpleTable rows={pHitl as any} columns={[
          { key: "id", label: "ID" }, { key: "lane", label: "Lane" }, { key: "item", label: "Item" },
          { key: "risk", label: "Risk" }, { key: "approver", label: "Approver" },
          { key: "backup", label: "Backup" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>

      <Section title="Customer & partner lifecycle boundary controls">
        <SimpleTable rows={pBoundary as any} columns={[
          { key: "surface", label: "Surface" }, { key: "control", label: "Control" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
        ]} />
      </Section>

      <Section title="RLS policy examples (polished)">
        <SimpleTable rows={pRls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title="Server boundary — ServerFn vs /api/public/* (polished)">
        <p className="text-xs text-muted-foreground mb-2">{pEdge.rule}</p>
        <SimpleTable rows={pEdge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <SimpleTable rows={pEdge.edge_routes as any} columns={[
          { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
        ]} />
      </Section>

      <Section title="Invariants (enforced in middleware)">
        <ul className="text-sm text-muted-foreground">{pInv.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>

      <Section title="Owner heatmap">
        <SimpleTable rows={pOwner as any} columns={[
          { key: "owner", label: "Owner" }, { key: "open", label: "Open" },
          { key: "overdue", label: "Overdue" }, { key: "sla_breach", label: "SLA breach" },
        ]} />
      </Section>

      <Section title="V22 demo flow (polished, persona-driven)">
        <SimpleTable rows={pDemo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="Long-term trust lifecycle operating roadmap (polished)">
        <SimpleTable rows={pRoadmap as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>

      <Section title="V22 feature matrix (baseline)">
        <SimpleTable rows={feat as any} columns={[
          { key: "feature", label: "Feature" }, { key: "status", label: "Status" }, { key: "hitl", label: "HITL" },
        ]} />
      </Section>

      <Section title="RLS examples (baseline)">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title="Server boundary (baseline)">
        <p className="text-xs text-muted-foreground mb-2">{edge.rule}</p>
        <SimpleTable rows={edge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <SimpleTable rows={edge.edge_routes as any} columns={[
          { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
        ]} />
      </Section>

      <Section title="Baseline invariants">
        <ul className="text-sm text-muted-foreground">{guard.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>

      <Section title="Baseline demo flow">
        <SimpleTable rows={demo as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="Baseline roadmap">
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
