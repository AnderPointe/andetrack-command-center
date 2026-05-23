import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V215Page } from "@/components/v215/V215Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v215/ui-bits";
import * as H from "@/v215/hooks";

function Page() {
  const headBase = H.useV215Headline();
  const headPolish = H.useV215PolishHeadlines();
  const scale = H.useEnterpriseTrustNetworkScale();
  const domains = H.useV215PolishDomains();
  const hitl = H.useV215PolishHitlQueue();
  const boundary = H.useV215PolishBoundary();
  const owners = H.useV215PolishOwnerHeatmap();
  const rls = H.useV215PolishRls();
  const edge = H.useV215PolishEdge();
  const invariants = H.useV215PolishInvariants();
  const demoPolish = H.useV215PolishDemo();
  const demoBase = H.useV215Demo();
  const roadmap = H.useV215PolishRoadmap();
  const teaser = H.useV215Phase57Teaser();
  const p2Head = H.useV215Polish2Headlines();
  const uplift = H.useV215Polish2DomainUplift();
  const lcKpis = H.useV215Polish2LifecycleKpis();
  const boundaryExtra = H.useV215Polish2BoundaryExtra();
  const rlsExtra = H.useV215Polish2RlsExtra();
  const edgeExtra = H.useV215Polish2EdgeExtra();
  const demoExtra = H.useV215Polish2DemoExtra();
  const roadmapDetail = H.useV215Polish2RoadmapDetail();
  const hitlLatency = H.useV215Polish2HitlLatency();

  return (
    <V215Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V21.5 — Enterprise Trust Network Scale (Polished)"
      blurb="Polished lifecycle-driven trust at network scale. All high-impact actions HITL-gated. Append-only evidence. Two-person sign-off on capital > $25k.">
      <ExecHeadline tag="V21.5 polished headline" headline={headPolish.headline} bullets={headPolish.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust network scale" value={scale.score} tone="emerald" />
        <ScoreCard label="Customer lifecycle" value={96} tone="emerald" />
        <ScoreCard label="Partner lifecycle"  value={95} tone="emerald" />
        <ScoreCard label="Board maturity"     value={96} tone="emerald" />
      </div>

      <ExecHeadline tag="V21.5 polish++ headline" headline={p2Head.headline} bullets={p2Head.highlights} />

      <Section title="Domain uplift (polish → polish++)">
        <SimpleTable rows={uplift as any} columns={[
          { key: "domain", label: "Domain" }, { key: "from", label: "From" }, { key: "to", label: "To" }, { key: "delta", label: "Δ" },
        ]} />
      </Section>

      <Section title="Lifecycle KPIs per domain (in / through / out)">
        <SimpleTable rows={lcKpis as any} columns={[
          { key: "domain", label: "Domain" }, { key: "in", label: "In" }, { key: "through", label: "Through" }, { key: "out", label: "Out" },
        ]} />
      </Section>

      <Section title="HITL latency (% of SLA)">
        <SimpleTable rows={hitlLatency as any} columns={[
          { key: "queue", label: "Queue" }, { key: "median_pct_of_sla", label: "Median %SLA" }, { key: "p90_pct_of_sla", label: "P90 %SLA" },
        ]} />
      </Section>

      <Section title="21 trust domains — polish heatmap">

        <SimpleTable rows={domains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "score", label: "Score" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>

      <Section title="HITL queue (approver_id ≠ recommender_id)">
        <SimpleTable rows={hitl as any} columns={[
          { key: "id", label: "ID" }, { key: "area", label: "Area" }, { key: "item", label: "Decision" },
          { key: "owner", label: "Owner" }, { key: "sla", label: "SLA" },
        ]} />
      </Section>

      <Section title="Customer + Partner trust boundary controls">
        <SimpleTable rows={boundary as any} columns={[
          { key: "surface", label: "Surface" }, { key: "exposes", label: "Exposes" }, { key: "hides", label: "Hides" },
        ]} />
      </Section>

      <Section title="Boundary controls (extra surfaces)">
        <SimpleTable rows={boundaryExtra as any} columns={[
          { key: "surface", label: "Surface" }, { key: "exposes", label: "Exposes" }, { key: "hides", label: "Hides" },
        ]} />
      </Section>


      <Section title="Owner heatmap">
        <SimpleTable rows={owners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "green", label: "Green" }, { key: "amber", label: "Amber" }, { key: "red", label: "Red" },
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

      <Section title="Server boundary — extras (ServerFn + /api/public/*)">
        <SimpleTable rows={edgeExtra.serverfn_extra as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" }, { key: "auth", label: "Auth" },
        ]} />
        <SimpleTable rows={edgeExtra.edge_routes_extra as any} columns={[
          { key: "path", label: "Public route" }, { key: "purpose", label: "Purpose" },
        ]} />
      </Section>

      <Section title="RLS policy examples (expanded)">
        <SimpleTable rows={rls as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title="RLS policy examples (extras)">
        <SimpleTable rows={rlsExtra as any} columns={[
          { key: "policy", label: "Policy" }, { key: "rule", label: "Rule" }, { key: "surface", label: "Surface" },
        ]} />
      </Section>

      <Section title="Invariants (enforced)">
        <ul className="text-sm text-muted-foreground">{invariants.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>

      <Section title="V21.5 polished demo (12 steps, persona-driven)">
        <SimpleTable rows={demoPolish as any} columns={[
          { key: "id", label: "#" }, { key: "who", label: "Persona" }, { key: "step", label: "Step" }, { key: "outcome", label: "Outcome" },
        ]} />
      </Section>

      <Section title="Base demo (reference)">
        <SimpleTable rows={demoBase as any} columns={[
          { key: "id", label: "#" }, { key: "actor", label: "Persona" }, { key: "step", label: "Step" },
        ]} />
      </Section>

      <Section title="Long-term trust network scale roadmap">
        <SimpleTable rows={roadmap as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>

      <Section title="Phase 57 (deferred)">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
        <p className="text-xs text-muted-foreground mt-1">Base headline: {headBase.headline}</p>
      </Section>
    </V215Page>
  );
}
export const Route = createFileRoute("/v215/overview")({ component: Page });
