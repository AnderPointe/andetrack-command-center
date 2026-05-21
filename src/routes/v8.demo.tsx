import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { ExecBanner } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useV8ExecHeadline } from "@/v8/hooks";

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

export const Route = createFileRoute("/v8/demo")({
  head: () => ({ meta: [{ title: "V8 Demo Flow · Anderoute" }] }),
  component: () => {
    const headline = useV8ExecHeadline();
    return (
      <V8Page icon={<ListChecks className="size-6 text-violet-300" />} title="V8 Demo Flow — Canada controlled pilot"
        blurb="17-step executive walkthrough of V8 global operating network scale: from global scale dashboard to country command to board report.">
        <ExecBanner h={headline} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <ol className="space-y-2 text-sm">
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
      </V8Page>
    );
  },
});
