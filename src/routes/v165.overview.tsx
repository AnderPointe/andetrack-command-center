import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V165Page } from "@/components/v165/V165Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v165/ui-bits";
import * as H from "@/v165/hooks";

function Page() {
  const h = H.useV165Headline();
  const pg = H.usePredictiveGovernance();
  const edge = H.useV165EdgeBoundary();
  const rls = H.useV165Rls();
  const teaser = H.useV165Phase47Teaser();
  return (
    <V165Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V16.5 — Predictive Governance Maturity"
      blurb="Mock-only. CoPilot predicts, assembles evidence, routes approvals, and tracks outcomes. Humans approve every high-impact action.">
      <ExecHeadline tag="V16.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Predictive governance" value={pg.score} tone="emerald" />
        <ScoreCard label="Approval orchestration" value="92%" tone="violet" />
        <ScoreCard label="Evidence automation" value="88%" tone="amber" />
        <ScoreCard label="Revenue automation" value="86%" tone="sky" />
      </div>
      <KpiGrid cols={4} items={pg.kpis} />
      <Section title="ServerFn · /api/public · Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },   { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V165Page>
  );
}
export const Route = createFileRoute("/v165/overview")({ component: Page });
