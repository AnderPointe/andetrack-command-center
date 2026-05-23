import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V16Page } from "@/components/v16/V16Page";
import { ExecHeadline, ScoreCard, KpiGrid, Section, SimpleTable } from "@/components/v16/ui-bits";
import * as H from "@/v16/hooks";

function Page() {
  const h = H.useV16Headline();
  const gov = H.useAutonomousAssistGovernance();
  const board = H.useCapitalGradeBoardIntelligence();
  const headlines = H.useV16PolishHeadlines();
  const heatmap = H.useV16OwnerHeatmap();
  const coverage = H.useV16ControlCoverage();
  const edge = H.useV16EdgeBoundaryPolish();
  const rls = H.useV16RlsExamples();
  const note = H.useV16PolishNote();
  const teaser = H.useV16Phase46Teaser();
  return (
    <V16Page icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Anderoute V16 — Autonomous-Assist Operating Governance (Polished)"
      blurb="Mock-only. CoPilot predicts, recommends, explains and tracks outcomes — humans approve every high-impact action across capital, revenue, marketplace, accounts, partners, product, category, and board.">
      <ExecHeadline tag="V16 headline" headline={h.headline} bullets={h.highlights} />
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Assist governance" value={gov.score} tone="violet" />
        <ScoreCard label="Approval SLA" value="91%" tone="emerald" />
        <ScoreCard label="Explainability" value="89%" tone="amber" />
        <ScoreCard label="Board intel" value={board.score} tone="sky" />
      </div>
      <KpiGrid cols={4} items={gov.kpis.slice(0, 8)} />

      <Section title="Area headlines (per owner)">
        <SimpleTable rows={headlines as any} columns={[
          { key: "area", label: "Area" },
          { key: "headline", label: "Headline" },
          { key: "owner", label: "Owner" },
        ]} />
      </Section>

      <Section title="Owner approval heatmap (7d)">
        <SimpleTable rows={heatmap as any} columns={[
          { key: "owner", label: "Owner" },
          { key: "pending", label: "Pending" },
          { key: "approved_7d", label: "Approved 7d" },
          { key: "sla_breach", label: "SLA breach" },
        ]} />
      </Section>

      <Section title="Strategic control coverage maturity">
        <SimpleTable rows={coverage as any} columns={[
          { key: "domain", label: "Domain" },
          { key: "coverage", label: "Coverage %" },
          { key: "automated", label: "Automated" },
          { key: "manual", label: "Manual" },
          { key: "gaps", label: "Gaps" },
        ]} />
      </Section>

      <Section title="ServerFn · /api/public · Edge function boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" },
          { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" },
          { key: "returns", label: "Returns" },
        ]} />
      </Section>

      <Section title="RLS policy examples (enforced on approvals)">
        <SimpleTable rows={rls as any} columns={[
          { key: "name", label: "Policy" },
          { key: "target", label: "Target" },
          { key: "sql", label: "SQL sketch" },
        ]} />
      </Section>

      <p className="text-xs text-muted-foreground">{note}</p>
      <p className="text-xs text-muted-foreground">{teaser}</p>
    </V16Page>
  );
}

export const Route = createFileRoute("/v16/overview")({ component: Page });
