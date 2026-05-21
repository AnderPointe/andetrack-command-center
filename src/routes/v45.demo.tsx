import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { RLS_EXAMPLES, EDGE_FN_PLAN, V45_MATURITY, DEMO_HIGHLIGHTS } from "@/v45/data/mockPhase22";

const SCENARIO = [
  { actor: "Platform owner", screen: "/v45/overview",          action: "Opens V4.5 Maturity Dashboard", result: `Automation 72% · Marketplace 81% · Mobile 76% · SOC 2 68% · Acquisition 61%` },
  { actor: "Dispatch lead",  screen: "/v45/approvals",         action: "Reviews approval queue",         result: "3 pending — 1 driver reassignment approved, 1 customer update queued, 1 escalated to ops" },
  { actor: "Ops leader",     screen: "/v45/marketplace-ops",   action: "Opens National Marketplace Ops", result: "3 open disputes · 2 carriers on watchlist · onboarding playbook assigned" },
  { actor: "Quality ops",    screen: "/v45/carrier-quality",   action: "Suspends a watchlist carrier",   result: "Suspension requires approval → escalated to ops, never automatic" },
  { actor: "Security lead",  screen: "/v45/soc2",              action: "Opens SOC 2 Execution Tracker",  result: "3 controls in remediation · evidence request generated · gap report created" },
  { actor: "Mobile lead",    screen: "/v45/mobile-launch",     action: "Opens Mobile Launch Center",     result: "iOS 85% · Android 80% · Android Auto 58% · CarPlay entitlement pending" },
  { actor: "Revenue leader", screen: "/v45/revenue-ops",       action: "Opens Revenue Ops Maturity",     result: "Marketplace + API revenue up · concentration risk moderate" },
  { actor: "Partner mgr",    screen: "/v45/partnerships",      action: "Opens Strategic Partnerships",   result: "Telematics partner launch-ready · Carrier network in security review" },
  { actor: "Regional lead",  screen: "/v45/national-ops",      action: "Opens National Ops Model",       result: "Southeast region missing owner — escalated as high-severity alert" },
  { actor: "Executive",      screen: "/v45/acquisition",       action: "Opens Acquisition Readiness",    result: "Data room 62% · product DD packet generated · platform-owner only" },
];

export const Route = createFileRoute("/v45/demo")({
  head: () => ({ meta: [{ title: "V4.5 Demo · Anderoute" }] }),
  component: () => (
    <V45Page icon={<ListChecks className="size-6 text-violet-300" />} title="V4.5 Demo Flow"
      blurb="Scripted walkthrough — every screen renders from the same mock data so the narrative stays consistent across roles.">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="border-violet-400/40 text-violet-200">Overall {V45_MATURITY.overall}%</Badge>
        <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">No autonomous dispatch</Badge>
        <Badge variant="outline" className="border-amber-400/40 text-amber-200">No certification claims without evidence</Badge>
        <Badge variant="outline" className="border-sky-400/40 text-sky-200">Human-approved automation</Badge>
      </div>

      <KpiGrid cols={6} items={DEMO_HIGHLIGHTS} />

      <SimpleTable rows={SCENARIO} columns={[
        { key: "actor", label: "Actor" },
        { key: "screen", label: "Screen", render: r => <Link to={r.screen} className="text-violet-300 hover:underline">{r.screen}</Link> },
        { key: "action", label: "Action" },
        { key: "result", label: "Result" },
      ]} />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy examples</h3>
        <div className="mt-2 grid gap-1.5 text-xs md:grid-cols-2">
          {RLS_EXAMPLES.map(r => (
            <div key={r.rule} className="rounded border border-white/5 p-2">
              <div className="font-medium">{r.rule}</div>
              <code className="text-[10px] text-muted-foreground">{r.predicate}</code>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold">Edge Function separation</h3>
          <div className="text-[10px] text-muted-foreground">
            {EDGE_FN_PLAN.filter(f => f.runtime.includes("TanStack")).length} server fns · {EDGE_FN_PLAN.filter(f => f.runtime.includes("Edge")).length} edge fns
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Internal maturity / approval / audit logic runs as TanStack server functions (auth-bound, RLS-scoped). Only signed external callbacks (Stripe, Samsara, App Store, Play Store, EDI) live in Supabase Edge Functions.
        </p>
        <div className="mt-2">
          <SimpleTable rows={EDGE_FN_PLAN} columns={[
            { key: "group", label: "Group" },
            { key: "fn", label: "Function" },
            { key: "runtime", label: "Runtime", render: r => <StatusPill status={r.runtime} /> },
            { key: "reason", label: "Why" },
          ]} />
        </div>
      </Card>
    </V45Page>
  ),
});
