import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { who: "CEO",   where: "/v65/platform-os",        what: "Strategic operating 86%, financial controls 78%, global readiness 52%, partner ecosystem 81%, compliance 84%." },
  { who: "CFO",   where: "/v65/financial-controls", what: "Billing exceptions: 2 failed payments; marketplace fee adjustment pending; revenue recognition service-period mapping incomplete (placeholder)." },
  { who: "CFO",   where: "/v65/revenue-rec",        what: "Revenue events classified; partner rev share % undefined; implementation milestone mapping open." },
  { who: "COO",   where: "/v65/mkt-controls",       what: "Watchlisted carrier blocked from receiving load award; 3 settlements pending approval; fee audit refreshed." },
  { who: "Pty",   where: "/v65/partner-marketplace",what: "Telematics partner NavTrack Pro submitted; listing requires security review; partner rev share placeholder created." },
  { who: "CCO",   where: "/v65/risk-matrix",        what: "Financial, security, AI, and marketplace controls mapped; 2 controls flagged for remediation; evidence request sent." },
  { who: "Strat", where: "/v65/global",             what: "Canada 58%, Mexico 41%, EU 29% — recommend localization, privacy review, regional compliance research." },
  { who: "Exec",  where: "/v65/decisions",          what: "Decision DEC-201 \"Expand into Canada pilot\": options, risks, financial impact (pl), customer + operational impact reviewed → approved with follow-ups." },
];

const ARCH = [
  { layer: "RLS posture",        detail: "company_id-scoped on tenant tables; platform-only on operating-score / governance / global-expansion / financial-control / risk-matrix / audit-evidence; billing & rev-rec restricted to company admin/owner; customer + carrier roles cannot read internal controls or governance records." },
  { layer: "Server boundaries",  detail: "Internal logic via TanStack createServerFn + requireSupabaseAuth. Stripe / partner billing webhooks via /api/public/* server routes with signature verification. No new Supabase Edge Functions for app-internal logic." },
  { layer: "Automation posture", detail: "Manual / assisted / suggested / human-approved / low-risk automated / restricted / prohibited. Autonomous dispatch is prohibited." },
  { layer: "Financial posture",  detail: "All revenue / cost / margin / FX / payout figures are placeholders. Recognition, billing, and settlement automations require finance approval before activation." },
  { layer: "Global posture",     detail: "International compliance is NOT asserted. Country readiness, localization, and regional compliance are tracked as research / placeholder states only." },
];

export const Route = createFileRoute("/v65/demo")({
  head: () => ({ meta: [{ title: "V6.5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V65Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V6.5 Demo Flow"
      blurb="End-to-end walkthrough of Anderoute's V6.5 strategic operating maturity — from the CEO's operating system view through CFO financial controls, COO marketplace controls, partnerships, risk, global expansion, and executive decision.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-3 text-sm">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-[10px] text-cyan-200">{i + 1}</span>
              <div>
                <div className="font-medium">{s.who} → <span className="text-cyan-300">{s.where}</span></div>
                <div className="text-muted-foreground">{s.what}</div>
              </div>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Architecture + governance posture</h3>
        <ul className="mt-2 space-y-2 text-xs">
          {ARCH.map(a => (
            <li key={a.layer}><span className="text-cyan-300">{a.layer}:</span> <span className="text-muted-foreground">{a.detail}</span></li>
          ))}
        </ul>
      </Card>
    </V65Page>
  ),
});
