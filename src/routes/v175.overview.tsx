import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const h = H.useV175Headline();
  const gs = H.useGovernedAutomationScale();
  const edge = H.useV175EdgeBoundary();
  const rls = H.useV175Rls();
  const teaser = H.useV175Phase49Teaser();
  return (
    <V175Page icon={<ShieldCheck className="size-6 text-emerald-300" />}
      title="Anderoute V17.5 — Governed Enterprise Automation Scale"
      blurb="Mock-only. CoPilot scales monitoring, evidence, routing, reminders, recommendations, and outcome tracking. Every high-impact business action still requires a human approver who is not the recommender.">
      <ExecHeadline tag="V17.5 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Governed automation scale" value={gs.score} tone="emerald" />
        <ScoreCard label="Approval orchestration scale" value="93%" tone="violet" />
        <ScoreCard label="Evidence automation scale" value="89%" tone="amber" />
        <ScoreCard label="Outcome learning maturity" value="87%" tone="sky" />
      </div>
      <KpiGrid cols={4} items={gs.kpis.slice(0, 12)} />
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
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/overview")({ component: Page });
