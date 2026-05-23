import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V21Page } from "@/components/v21/V21Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v21/ui-bits";
import * as H from "@/v21/hooks";

function Page() {
  const h = H.useV21PolishHeadlines();
  const n = H.useEnterpriseTrustIntelligenceNetwork();
  const domains = H.useV21PolishDomains();
  const hitl = H.useV21PolishHitlQueue();
  const boundary = H.useV21PolishBoundary();
  const rls = H.useV21PolishRls();
  const edge = H.useV21PolishEdge();
  const invariants = H.useV21PolishInvariants();
  const demo = H.useV21PolishDemo();
  const roadmap = H.useV21PolishRoadmap();
  const owners = H.useV21PolishOwnerHeatmap();
  const teaser = H.useV21Phase56Teaser();

  return (
    <V21Page icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Anderoute V21 — Enterprise Trust Intelligence Network"
      blurb="Polished V21 mock. Customer, partner, marketplace, board, revenue, evidence, risk, audit, approvals, recommendations, outcomes, capital, product, and category trust connected through one HITL-gated network.">
      <ExecHeadline tag="V21 polish headline" headline={h.headline} bullets={h.highlights} />

      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust intelligence network" value={n.score} tone="violet" />
        <ScoreCard label="Customer trust scale" value={95} tone="emerald" />
        <ScoreCard label="Partner trust scale" value={93} tone="emerald" />
        <ScoreCard label="Board trust execution" value={96} tone="emerald" />
      </div>

      <Section title="19-domain trust heatmap">
        <SimpleTable rows={domains as any} columns={[
          { key: "domain", label: "Domain" }, { key: "score", label: "Score" },
          { key: "owner", label: "Owner" }, { key: "status", label: "Status" },
          { key: "open_hitl", label: "Open HITL" },
        ]} />
      </Section>

      <Section title="HITL queue (approver_id ≠ recommender_id)">
        <SimpleTable rows={hitl as any} columns={[
          { key: "id", label: "ID" }, { key: "action", label: "Action" },
          { key: "risk", label: "Risk" }, { key: "impact", label: "Impact" },
          { key: "approver", label: "Approver" }, { key: "recommender", label: "Recommender" },
          { key: "sla", label: "SLA" },
        ]} />
      </Section>

      <Section title="Customer / partner / carrier / board boundary">
        <SimpleTable rows={boundary as any} columns={[
          { key: "surface", label: "Surface" }, { key: "boundary", label: "Boundary" },
          { key: "external_use", label: "External use" }, { key: "portal_expose", label: "Portal exposure" },
          { key: "status", label: "Status" },
        ]} />
      </Section>

      <Section title="Owner heatmap">
        <SimpleTable rows={owners as any} columns={[
          { key: "owner", label: "Owner" }, { key: "domains", label: "Domains" },
          { key: "open_hitl", label: "Open HITL" }, { key: "score", label: "Score" },
        ]} />
      </Section>

      <Section title="Server boundary — ServerFn vs /api/public/*">
        <p className="mb-2 text-xs text-muted-foreground">{edge.separation_rule}</p>
        <SimpleTable rows={edge.serverfn as any} columns={[
          { key: "name", label: "ServerFn" }, { key: "kind", label: "Kind" },
          { key: "auth", label: "Auth" }, { key: "note", label: "Note" },
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
        <ul className="text-sm text-muted-foreground">{invariants.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>

      <Section title="V21 demo flow (12 steps, persona-driven)">
        <SimpleTable rows={demo as any} columns={[
          { key: "step", label: "#" }, { key: "persona", label: "Persona" },
          { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
        ]} />
      </Section>

      <Section title="Long-term trust intelligence network roadmap">
        <SimpleTable rows={roadmap as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "theme", label: "Theme" }, { key: "target", label: "Target" },
        ]} />
      </Section>

      <Section title="Phase 56 teaser (deferred)">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
      </Section>
    </V21Page>
  );
}
export const Route = createFileRoute("/v21/overview")({ component: Page });
