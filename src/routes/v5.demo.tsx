import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { Card } from "@/components/ui/card";

const STEPS = [
  { actor: "Executive",        action: "Open National Platform Maturity",        to: "/v5/maturity",       hit: "Overall 87% · 16 pillars" },
  { actor: "Ops leader",       action: "Open Marketplace Liquidity",             to: "/v5/liquidity",      hit: "Score 78% · 230 uncovered" },
  { actor: "Ops leader",       action: "Open Supply / Demand",                   to: "/v5/supply-demand",  hit: "SE needs flatbed + box truck" },
  { actor: "Marketplace mgr",  action: "Open Carrier Quality",                   to: "/v5/carrier-quality", hit: "18 elite · 9 watchlist · 3 suspended" },
  { actor: "Security leader",  action: "Open Certification Completion",          to: "/v5/certification",  hit: "SOC 2 76% complete" },
  { actor: "Security leader",  action: "Open SOC 2 Tracker",                     to: "/v5/soc2",           hit: "3 exceptions to remediate" },
  { actor: "Revenue leader",   action: "Open Mature Revenue Ops",                to: "/v5/revenue-ops",    hit: "Renewals healthy · 3 expansion" },
  { actor: "Executive",        action: "Open Board Report Builder",              to: "/v5/board",          hit: "KPIs, risks, decisions" },
  { actor: "Strategy leader",  action: "Open Category Leadership",               to: "/v5/category",       hit: "6 differentiators tracked" },
];

export const Route = createFileRoute("/v5/demo")({
  head: () => ({ meta: [{ title: "V5 Demo Flow · Anderoute" }] }),
  component: () => (
    <V5Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V5 Demo Flow"
      blurb="Walkthrough connecting every V5 module: executives, operations, marketplace, security, revenue, and strategy.">
      <ol className="space-y-2">
        {STEPS.map((s, i) => (
          <li key={i}>
            <Card className="border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-fuchsia-300">{i + 1}. {s.actor}</span> → {s.action}
                </div>
                <Link to={s.to} className="text-xs text-violet-300 hover:underline">Open →</Link>
              </div>
              <div className="text-[11px] text-muted-foreground">{s.hit}</div>
            </Card>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
          <h3 className="text-sm font-semibold">RLS policy stance</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>· Platform-owner-only tables (maturity, board, data room)</li>
            <li>· Company-scoped tables (liquidity, lanes, carriers) keyed on <code>company_id</code></li>
            <li>· Security-lead scoped (SOC 2 controls, exceptions)</li>
            <li>· No anonymous policies — RLS backs every server-fn check</li>
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs">
          <h3 className="text-sm font-semibold">Server boundary</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>· Internal logic → <strong>TanStack server functions</strong> + <code>requireSupabaseAuth</code></li>
            <li>· External webhooks (Stripe, Samsara, App Store, EDI) → signature-verified <strong>server routes under <code>/api/public/*</code></strong></li>
            <li>· No fully autonomous dispatch — human-approved AI only</li>
          </ul>
        </Card>
      </div>
    </V5Page>
  ),
});
