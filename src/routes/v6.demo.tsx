import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { who: "CEO",  where: "/v6/category",        what: "Category leadership 91%, defensibility 86%, ecosystem scale 84%, economics maturity 82%." },
  { who: "COO",  where: "/v6/network",         what: "Live network: companies, drivers, carriers, loads, GPS, nav, marketplace, API, EDI, webhooks, CoPilot, automation, support, revenue events." },
  { who: "Ops",  where: "/v6/liquidity",       what: "Liquidity 81% — Southeast equipment gap; system recommends carrier acquisition campaign." },
  { who: "CISO", where: "/v6/evidence",        what: "SOC 2 evidence 83%, freshness 91%, 2 controls need remediation. No certification claim made." },
  { who: "CFO",  where: "/v6/economics",       what: "Revenue quality 78%. Split across SaaS, marketplace, API, support. Customer concentration moderate." },
  { who: "Board",where: "/v6/board",           what: "Packet auto-builds: exec summary, revenue quality, liquidity, retention, certification, risks, roadmap requests." },
  { who: "Strat",where: "/v6/exit-readiness",  what: "Readiness 64%, data room 72%, financial reporting placeholder 48%. Focus areas: revenue quality, audit evidence, concentration." },
];

const ARCH = [
  { layer: "RLS posture",       detail: "company_id-scoped on tenant tables; platform-only on leadership / board / investor / risk / roadmap tables; admin/security restricted on certification + AI gov; customer + carrier roles cannot read internal leadership/revenue/board records." },
  { layer: "Server boundaries", detail: "Internal logic via TanStack createServerFn (createServerFn + requireSupabaseAuth). Webhooks/cron via /api/public/* server routes with signature verification. No new Supabase Edge Functions for app-internal logic." },
  { layer: "Automation posture",detail: "Manual / assisted / suggested / human-approved / low-risk automated / restricted high-risk / prohibited. Autonomous dispatch is prohibited." },
  { layer: "AI posture",        detail: "Confidence thresholds, explainability coverage, data freshness, audit logging and human approval gates enforced before action." },
];

export const Route = createFileRoute("/v6/demo")({
  head: () => ({ meta: [{ title: "V6 Demo Flow · Anderoute" }] }),
  component: () => (
    <V6Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V6 Demo Flow"
      blurb="End-to-end walkthrough of Anderoute's V6 category-defining platform — from CEO category dashboard to strategic exit readiness — with explicit architectural and governance posture.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ol className="space-y-3 text-sm">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 text-[10px] text-emerald-200">{i + 1}</span>
              <div>
                <div className="font-medium">{s.who} → <span className="text-emerald-300">{s.where}</span></div>
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
            <li key={a.layer}><span className="text-emerald-300">{a.layer}:</span> <span className="text-muted-foreground">{a.detail}</span></li>
          ))}
        </ul>
      </Card>
    </V6Page>
  ),
});
