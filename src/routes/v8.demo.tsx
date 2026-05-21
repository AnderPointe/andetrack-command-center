import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { ExecBanner, OverlayStrip } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useV8ExecHeadline, useV8ExecutionOverlays } from "@/v8/hooks";

const STEPS = [
  { who: "CEO",            step: "Open Global Operating Network Scale Dashboard",         outcome: "Scale score 76 · USA active · Canada controlled pilot · Mexico planning · EU/UK research" },
  { who: "COO",            step: "Open Country Operating Command Center → Canada",        outcome: "Health 79 · MP 72 · Comp 68 · Fin 74 · 2 executive decisions needed" },
  { who: "Marketplace lead", step: "Open Regional Marketplace Liquidity",                 outcome: "ON corridor reefer coverage weak — recommend reefer carrier recruitment" },
  { who: "Carrier ops",    step: "Open International Carrier Operations",                 outcome: "ON Logistics under review · Maple Cargo verified · Frontera onboarding" },
  { who: "CFO",            step: "Open Financial Control Maturity Center",                outcome: "Maturity 71 · API overage in review · marketplace fee controls passing" },
  { who: "Finance",        step: "Open Revenue Reconciliation Maturity (placeholder)",    outcome: "6 unmatched usage events · 4 unmatched MP fees · ownership assigned" },
  { who: "Billing ops",    step: "Open Global Billing & Usage Controls",                  outcome: "CAD/EN+FR placeholders tracked · 2 failed payments in USA queue" },
  { who: "Compliance lead", step: "Open Country Compliance Execution → Canada",           outcome: "Privacy/data residency in progress · AI gov passing · mobile evidence needed" },
  { who: "CS lead",        step: "Open Global Customer Success Operations",               outcome: "Regulated accounts strong · Cross-Pac Shipping at-risk · 4 expansion opportunities" },
  { who: "Support",        step: "Open International Support Operations",                 outcome: "SLA 88-96 across regions · 1 critical CA escalation · KB in progress" },
  { who: "Partner lead",   step: "Open Global Partner Operations",                        outcome: "US partners live · CA telematics in pilot · Quebec Fuel planning" },
  { who: "Risk",           step: "Open Global Risk & Control Command Center",             outcome: "14 areas mapped · top: country launch + compliance + data residency" },
  { who: "CPO",            step: "Open Global Product Adoption",                          outcome: "Canada adoption gaps: CoPilot, EDI, customer portal" },
  { who: "Strategy",       step: "Open Regional Expansion Decision Engine",               outcome: "Canada: continue controlled pilot · Mexico: continue planning · EU/UK: defer" },
  { who: "Exec team",      step: "Open Executive Strategic Governance",                   outcome: "6 open decisions · oldest 9d · 2 exceptions · approve Canada pilot extension" },
  { who: "COO",            step: "Open Long-Term Global Operating Model",                 outcome: "Maturity 73 · 13 operating areas · owners + cadence locked" },
  { who: "CEO",            step: "Generate Board Global Strategy Report",                 outcome: "12-section report with global priorities for next quarter" },
];

const ROLE_GUIDANCE: { role: string; cls: string; titleCls: string; lines: string[] }[] = [
  { role: "CEO",  cls: "border-violet-400/30 bg-violet-400/5",   titleCls: "text-violet-200",  lines: ["Hold scale > 75 through Canada pilot resolution", "Sign off board strategy report ahead of board"] },
  { role: "COO",  cls: "border-sky-400/30 bg-sky-400/5",         titleCls: "text-sky-200",     lines: ["Close 2 open Canada executive decisions this week", "Re-baseline operating model after Q close"] },
  { role: "CFO",  cls: "border-amber-400/30 bg-amber-400/5",     titleCls: "text-amber-200",   lines: ["Approve API overage control fix + re-test in 7d", "Confirm revenue recon placeholder framing in board pack"] },
  { role: "CCO",  cls: "border-emerald-400/30 bg-emerald-400/5", titleCls: "text-emerald-200", lines: ["Resolve 1 critical compliance exception this week", "Schedule Canada mobile-evidence capture"] },
];

export const Route = createFileRoute("/v8/demo")({
  head: () => ({ meta: [{ title: "V8 Demo Flow · Anderoute" }] }),
  component: () => {
    const headline = useV8ExecHeadline();
    const overlays = useV8ExecutionOverlays();
    return (
      <V8Page icon={<ListChecks className="size-6 text-violet-300" />} title="V8 Demo Flow — Canada controlled pilot"
        blurb="17-step executive walkthrough of V8 global operating network scale: from global scale dashboard to country command to board report. Role-grouped guidance shows what each executive owns this week.">
        <ExecBanner h={headline} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Role-specific guidance — this week</h3>
          <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {ROLE_GUIDANCE.map((g) => (
              <div key={g.role} className={`rounded-md border border-${g.tone}-400/30 bg-${g.tone}-400/5 p-3 text-sm`}>
                <div className={`font-semibold text-${g.tone}-200`}>{g.role}</div>
                <ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">
                  {g.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">17-step walkthrough</h3>
          <ol className="mt-2 space-y-2 text-sm">
            {STEPS.map((s, i) => (
              <li key={i} className="grid grid-cols-[2rem_8rem_1fr_1fr] items-start gap-2 border-b border-white/5 pb-2 last:border-0">
                <span className="text-muted-foreground">{i + 1}.</span>
                <span className="font-medium text-violet-200">{s.who}</span>
                <span>{s.step}</span>
                <span className="text-xs text-muted-foreground">{s.outcome}</span>
              </li>
            ))}
          </ol>
        </Card>

        <OverlayStrip items={overlays} title="Executive overlays — all V8 modules" />
      </V8Page>
    );
  },
});
