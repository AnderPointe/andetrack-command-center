import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V205Page } from "@/components/v205/V205Page";
import { ExecHeadline, ScoreCard, Section, SimpleTable } from "@/components/v205/ui-bits";
import * as H from "@/v205/hooks";

function Page() {
  const h = H.useV205Headline();
  const s = H.useEnterpriseTrustScale();
  const rls = H.useV205Rls();
  const edge = H.useV205Edge();
  const guards = H.useV205Guardrails();
  const teaser = H.useV205Phase55Teaser();
  return (
    <V205Page icon={<ShieldCheck className="size-6 text-teal-300" />}
      title="Anderoute V20.5 — Enterprise Trust Scale"
      blurb="Mock-only. Trust controls, evidence, audits, approvals, exceptions, and board reporting scale across enterprise operations — HITL on every high-impact assist.">
      <ExecHeadline tag="V20.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Enterprise trust scale" value={s.score} tone="violet" />
        <ScoreCard label="Board assurance" value={95} tone="emerald" />
        <ScoreCard label="Revenue optimization" value={94} tone="emerald" />
        <ScoreCard label="MP governance" value={92} tone="amber" />
      </div>
      <Section title="Server boundary (ServerFn vs Edge)">
        <SimpleTable rows={edge.serverfn.slice(0, 12) as any} columns={[
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
      <Section title="Guardrails (still enforced)">
        <ul className="text-sm text-muted-foreground">{guards.map((g) => <li key={g}>· {g}</li>)}</ul>
      </Section>
      <Section title="Phase 55 teaser">
        <p className="text-sm text-muted-foreground"><b>{teaser.version}</b> — {teaser.themes.join(" · ")}</p>
      </Section>
    </V205Page>
  );
}
export const Route = createFileRoute("/v205/overview")({ component: Page });
