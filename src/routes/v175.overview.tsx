import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V175Page } from "@/components/v175/V175Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v175/ui-bits";
import * as H from "@/v175/hooks";

function Page() {
  const h = H.useV175Headline();
  const gs = H.useGovernedAutomationScale();
  const edge = H.useV175EdgeBoundaryPolish();
  const rls = H.useV175RlsPolish();
  const headlines = H.useV175PolishHeadlines();
  const evidence = H.useV175EvidenceFreshness();
  const roadmap = H.useV175RoadmapPolish();
  const notes = H.useV175LongTermNotes();
  const teaser = H.useV175Phase49TeaserPolish();
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
      <Section title="Phase 48 polish headlines (per area)">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" }, { key: "headline", label: "Headline" }, { key: "trend", label: "Trend" },
        ]} />
      </Section>
      <Section title="Evidence freshness by category">
        <SimpleTable rows={evidence as any} columns={[
          { key: "category", label: "Category" }, { key: "freshness", label: "Fresh" },
          { key: "stale", label: "Stale" }, { key: "owner", label: "Owner" },
        ]} />
      </Section>
      <Section title="ServerFn · /api/public · Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },   { key: "returns", label: "Returns" },
        ]} />
      </Section>
      <Section title="RLS policy examples (V17.5)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" }, { key: "target", label: "Target" }, { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>
      <Section title="Long-term automation scale roadmap">
        <SimpleTable rows={roadmap as any} columns={[
          { key: "horizon", label: "Horizon" }, { key: "focus", label: "Focus" },
        ]} />
      </Section>
      <Section title="Governance invariants">
        <ul className="text-sm text-muted-foreground">{notes.map(n => <li key={n}>· {n}</li>)}</ul>
      </Section>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V175Page>
  );
}
export const Route = createFileRoute("/v175/overview")({ component: Page });
