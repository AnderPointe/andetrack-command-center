import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "V10 Demo Flow";
const BLURB = "Executive walkthrough — CEO → CRO → MP → CFO → CS → Strategy → Board.";
const STEPS = [
  { who: "CEO",     step: "Open Global Category Leadership Command Center",   outcome: "Score 92 · trust 88 · MP proof 84 · economics 81 · defensibility 86" },
  { who: "CRO",     step: "Open Enterprise Trust Commercialization Center",   outcome: "Readiness 86 · AcmeCo blocked on AI disclosure refresh" },
  { who: "MP",      step: "Open Marketplace Value Proof Center",              outcome: "Coverage 92 · bids 3.4 · time-to-award 48m → target 35" },
  { who: "CFO",     step: "Open Platform Economics Maturity Center",          outcome: "SaaS strong · MP growing · API emerging · concentration moderate" },
  { who: "CS",      step: "Open Customer Retention Expansion Command Center", outcome: "3 expansion-ready · BlueRidge churn risk · playbook generated" },
  { who: "Strategy",step: "Open Competitive Category Positioning",            outcome: "Leader vs legacy + pure-plays · battlecards refreshed" },
  { who: "Board",   step: "Open Board and Investor Narrative Center",         outcome: "15 sections · 13 ready · 2 in progress · proof attached" },
  { who: "CEO",     step: "Approve V10 category leadership action plan",      outcome: "5 actions signed (CMO/PMM/Partner/AI/MP)" },
];

function Page() {
  const h = H.useV10ExecHeadline();
  const overlays = H.useV10ExecutionOverlays();
  const guidance = H.useV10RoleGuidance();
  const rls = H.useV10RlsExamples();
  const boundary = H.useV10BackendBoundary();
  return (
    <V10Page icon={<ListChecks className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <ExecBanner h={h} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {guidance.map(g => (
            <div key={g.role} className="rounded-lg border border-amber-400/30 bg-white/[0.02] p-3 text-sm">
              <div className="text-xs uppercase tracking-wide opacity-80">{g.role}</div>
              <div className="mt-1">{g.focus}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-2 text-sm">
          {STEPS.map((s, i) => (
            <li key={i} className="grid grid-cols-[2rem_8rem_1fr_1fr] items-start gap-2 border-b border-white/5 pb-2 last:border-0">
              <span className="text-muted-foreground">{i + 1}.</span>
              <span className="font-medium text-amber-200">{s.who}</span>
              <span>{s.step}</span>
              <span className="text-xs text-muted-foreground">{s.outcome}</span>
            </li>
          ))}
        </ol>
      </Card>
      <OverlayStrip items={overlays as any} title="Executive overlays — all V10 modules" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy references</h3>
        <p className="mt-1 text-xs text-muted-foreground">Mock-only — see <code>docs/phase33-rls.sql</code>.</p>
        <div className="mt-2 space-y-2">
          {rls.map(r => (
            <div key={r.table} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-amber-200">{r.table}</span><span className="text-xs text-muted-foreground">{r.policy}</span></div>
              <pre className="mt-2 overflow-x-auto text-[11px] text-muted-foreground">{r.sql}</pre>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Backend boundary</h3>
        <SimpleTable rows={boundary as any} columns={[
          { key: "kind", label: "Kind" }, { key: "name", label: "Name" },
          { key: "caller", label: "Caller" }, { key: "auth", label: "Auth" },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/demo")({
  head: () => ({ meta: [{ title: "V10 Demo Flow · Anderoute V10" }] }),
  component: Page,
});
