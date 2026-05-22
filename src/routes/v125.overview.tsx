import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const ops = H.useCapitalGrowthOperations();
  const aud = H.useCommercialAuditability();
  const ri = H.useGlobalRevenueIntelligence();
  const rq = H.useRevenueQualityControls();
  const board = H.useCapitalBoardGrowthReporting();
  const dr = H.useCommercialDataRoomEvidence();
  const teaser = H.useV125Phase39Teaser();
  const boundary = H.useV125BackendBoundary();
  const rls = H.useV125RlsExamples();
  const drReady = dr.filter((r) => r.status === "ready").length;
  return (
    <V125Page icon={<Gauge className="size-6 text-teal-300" />} title="Anderoute V12.5 — Capital-Grade Growth Operations" blurb="Mock-only. Capital-grade enterprise growth operating system — auditability, revenue intelligence, partner channel optimization, board-ready evidence. No autonomous dispatch, no audit/IPO completeness claims.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Growth operations"   value={ops.score.score}  tone="emerald" />
        <ScoreCard label="Commercial audit"    value={aud.score}        tone="sky" />
        <ScoreCard label="Revenue intelligence" value={ri.score}        tone="violet" />
        <ScoreCard label="Revenue quality ctl" value={rq.score}         tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Growth operations trend</h3>
        <SimpleTable rows={ops.trend as any} columns={[
          { key: "quarter", label: "Quarter" },
          { key: "score", label: "Score" },
          { key: "pipeline", label: "Pipeline" },
          { key: "expansion", label: "Expansion" },
          { key: "marketplace", label: "Marketplace" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Next growth actions</h3>
        <SimpleTable rows={ops.actions as any} columns={[
          { key: "action", label: "Action" }, { key: "owner", label: "Owner" }, { key: "impact", label: "Impact" }, { key: "due", label: "Due" },
        ]} />
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Board growth pack — section status</h3>
          <SimpleTable rows={board.sections as any} columns={[
            { key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Commercial data room readiness</h3>
          <p className="text-xs text-muted-foreground">{drReady}/{dr.length} sections ready.</p>
          <SimpleTable rows={dr as any} columns={[
            { key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Server boundary &amp; RLS examples</h3>
        <div className="mt-2 grid gap-3 lg:grid-cols-2">
          <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "auth", label: "Auth" }]} />
          <SimpleTable rows={rls as any} columns={[{ key: "table", label: "Table" }, { key: "policy", label: "Policy" }]} />
        </div>
      </Card>
      <Card className="border-teal-400/20 bg-teal-400/5 p-4">
        <h3 className="text-sm font-semibold text-teal-100">Phase 39 (V13) teaser — not started</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
          {teaser.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/overview")({
  head: () => ({ meta: [{ title: "V12.5 Overview · Phase 38" }] }),
  component: Page,
});
