import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { ExecBanner, OverlayStrip, SimpleTable } from "@/components/v95/ui-bits";
import { Card } from "@/components/ui/card";
import * as H from "@/v95/hooks";

const STEPS = [
  { who: "CEO",     step: "Open Global Enterprise Stewardship Dashboard",     outcome: "Trust 88 · Financial gov 81 · Cert evidence 79 · MP quality 84 · Customer trust 86" },
  { who: "CSO",     step: "Open Enterprise Trust Command Center",             outcome: "15 trust domains · 2 needs_test · 3 remediation items live" },
  { who: "CSO",     step: "Open Certification Evidence Maturity Center",      outcome: "Freshness 90 · 3 controls need refresh · audit package 76 (placeholder)" },
  { who: "CFO",     step: "Open Financial Governance Maturity Center",        outcome: "Billing strong · 1 MP fee exception · evidence 82% · trend +7 pts" },
  { who: "MP",      step: "Open Marketplace Intelligence Optimization",       outcome: "TX/Midwest strong · SE concentration → preferred carrier recruitment" },
  { who: "MP",      step: "Open Marketplace Quality Governance",              outcome: "Preferred program in_progress · 1 fee in_review · 12 governance areas" },
  { who: "CCO",     step: "Open Global Customer Trust Dashboard",             outcome: "2 packets stale · 1 AI disclosure pending · packet builder triggered" },
  { who: "Strategy",step: "Open Strategic Category Leadership Execution",     outcome: "Narrative 82 · proof 74 · publish enterprise trust narrative" },
  { who: "Board",   step: "Open Board & Investor Operating Discipline",       outcome: "Packet 88 ready · 3 decisions pending · KPI snapshot attached" },
  { who: "CEO",     step: "Open Platform Value Creation Dashboard",           outcome: "Value 82 · expansion 76 · API monetization 72 — 3 value actions" },
  { who: "Risk",    step: "Open Strategic Risk Execution",                    outcome: "10 risks · residual trend down · 5 board-visible items mapped" },
  { who: "CEO",     step: "Approve V9.5 stewardship action plan",             outcome: "6 commitments signed — see closeout below" },
];


const TONE: Record<string, string> = {
  violet: "border-violet-400/30 text-violet-200",
  emerald: "border-emerald-400/30 text-emerald-200",
  amber: "border-amber-400/30 text-amber-200",
  sky: "border-sky-400/30 text-sky-200",
  rose: "border-rose-400/30 text-rose-200",
};

function Page() {
  const h = H.useV95ExecHeadline();
  const overlays = H.useV95ExecutionOverlays();
  const guidance = H.useV95RoleGuidance();
  const rls = H.useV95RlsExamples();
  const boundary = H.useV95BackendBoundary();
  return (
    <V95Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V9.5 Demo Flow" blurb="12-step executive walkthrough with role guidance, RLS examples, backend boundary, and a signed closeout.">
      <ExecBanner h={h} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {guidance.map((g) => (
            <div key={g.role} className={`rounded-lg border ${TONE[g.tone]} bg-white/[0.02] p-3 text-sm`}>
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
              <span className="font-medium text-cyan-200">{s.who}</span>
              <span>{s.step}</span>
              <span className="text-xs text-muted-foreground">{s.outcome}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-emerald-400/30 bg-emerald-500/5 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-emerald-200">Demo closeout — signed commitments</h3>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">post-Phase-32</span>
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {H.useV95DemoCloseout().map((c, i) => (
            <div key={i} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs">
              <div className="flex items-center justify-between"><span className="text-cyan-200">{c.owner}</span><span className="text-muted-foreground">due {c.due}</span></div>
              <div className="mt-0.5 text-sm">{c.commitment}</div>
            </div>
          ))}
        </div>
      </Card>

      <OverlayStrip items={overlays as any} title="Executive overlays — all V9.5 modules" />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy references</h3>
        <p className="mt-1 text-xs text-muted-foreground">Mock-only — see <code>docs/phase32-rls.sql</code>.</p>
        <div className="mt-2 space-y-2">
          {rls.map((r) => (
            <div key={r.table} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-cyan-200">{r.table}</span><span className="text-xs text-muted-foreground">{r.policy}</span></div>
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
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/demo")({
  head: () => ({ meta: [{ title: "V9.5 Demo · Anderoute" }] }),
  component: Page,
});
