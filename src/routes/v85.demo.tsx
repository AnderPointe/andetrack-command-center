import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V85Page } from "@/components/v85/V85Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v85/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v85/hooks";

export const Route = createFileRoute("/v85/demo")({
  head: () => ({ meta: [{ title: "V8.5 Demo Flow · Anderoute" }] }),
  component: () => {
    const headline = H.useV85ExecHeadline();
    const overlays = H.useV85ExecutionOverlays();
    const guidance = H.useV85RoleGuidance();
    const rls = H.useV85RlsExamples();
    const toneMap: Record<string,string> = {
      violet:  "border-violet-400/30 text-violet-200",
      sky:     "border-sky-400/30 text-sky-200",
      amber:   "border-amber-400/30 text-amber-200",
      emerald: "border-emerald-400/30 text-emerald-200",
      rose:    "border-rose-400/30 text-rose-200",
    };
    const STEPS = [
      {who:"CEO",step:"Open Global Enterprise Operating Discipline Dashboard",outcome:"Discipline 82 · Marketplace 84 · Compliance 79 · Support 81"},
      {who:"COO",step:"Open Country Accountability Dashboard",outcome:"Canada 78 · Mexico 63 · EU 41 · 2 Canada exceptions"},
      {who:"CFO",step:"Open Financial Control Testing Center",outcome:"6 pass · 3 review · 1 exception · Revenue Control 73"},
      {who:"Marketplace",step:"Open Marketplace Financial Optimization",outcome:"TTAward improved · uncovered down · disputes up in W"},
      {who:"Marketplace",step:"Open Marketplace Economics Optimization",outcome:"Top action: lift ON liquidity 58→70 in 30d"},
      {who:"Board chair",step:"Open Advanced Board Governance Center",outcome:"10 packet sections drafted · 5 decisions pending"},
      {who:"CCO",step:"Open International Control Maturity Center",outcome:"Data residency needs test · AI gov passing · 1 support remediation"},
      {who:"CPO",step:"Open Product-Line Stewardship",outcome:"Expand: CoPilot + Marketplace + Portal · maintain EDI"},
      {who:"Risk",step:"Open Strategic Risk Ownership",outcome:"8 risks · 5 board-visible · residual trending down"},
      {who:"AI",step:"Open AI Governance Stewardship",outcome:"Score 82 · 14 rules · explainability 86%"},
      {who:"SRE",step:"Open Platform Reliability Stewardship",outcome:"Score 85 · 1 critical 30d · 2 PMs in progress"},
      {who:"CS",step:"Open Customer Success Discipline",outcome:"Score 83 · Cross-Pac at risk · 4 expansion opportunities"},
      {who:"Support",step:"Open International Support Discipline",outcome:"Score 81 · CA bilingual placeholder · 1 critical CA"},
      {who:"Partner",step:"Open Partner Operating Discipline",outcome:"Score 78 · 3 live · 1 pilot · 3 issues"},
      {who:"COO",step:"Open Long-Term Platform Stewardship Model",outcome:"Score 79 · 12 domains · 5 top risks"},
      {who:"CEO",step:"Open Executive Stewardship Dashboard",outcome:"11 exec priorities · 3 cross-functional blockers"},
      {who:"Board",step:"Lock board packet for 2026-06-24 review",outcome:"Sign off API overage + CA pilot + ON reefer"},
    ];
    return (<V85Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V8.5 Demo Flow" blurb="17-step executive walkthrough with role guidance and RLS policy references.">
      <ExecBanner h={headline} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {guidance.map((g) => (
            <div key={g.role} className={`rounded-lg border ${toneMap[g.tone]} bg-white/[0.02] p-3 text-sm`}>
              <div className="text-xs uppercase tracking-wide opacity-80">{g.role}</div>
              <div className="mt-1">{g.focus}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4"><ol className="space-y-2 text-sm">{STEPS.map((s,i)=>(<li key={i} className="grid grid-cols-[2rem_9rem_1fr_1fr] items-start gap-2 border-b border-white/5 pb-2 last:border-0"><span className="text-muted-foreground">{i+1}.</span><span className="font-medium text-fuchsia-200">{s.who}</span><span>{s.step}</span><span className="text-xs text-muted-foreground">{s.outcome}</span></li>))}</ol></Card>
      <OverlayStrip items={overlays as any} title="Executive overlays — all V8.5 modules" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy references</h3>
        <p className="mt-1 text-xs text-muted-foreground">Mock-only — see <code>docs/phase30-rls.sql</code> for the full set.</p>
        <div className="mt-2 space-y-2">
          {rls.map((r) => (
            <div key={r.table} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-fuchsia-200">{r.table}</span><span className="text-xs text-muted-foreground">{r.policy}</span></div>
              <pre className="mt-2 overflow-x-auto text-[11px] text-muted-foreground">{r.sql}</pre>
            </div>
          ))}
        </div>
      </Card>
    </V85Page>);
  },
});
