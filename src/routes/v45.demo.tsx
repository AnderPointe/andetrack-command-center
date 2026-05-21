import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleTable, StatusPill } from "@/components/v45/ui-bits";
import { RLS_EXAMPLES, EDGE_FN_PLAN, V45_MATURITY } from "@/v45/data/mockPhase22";

const SCENARIO = [
  { actor: "Platform owner", action: "Opens V4.5 Maturity Dashboard", result: `Automation 72% · Marketplace 81% · Mobile 76% · SOC 2 68% · Acquisition 61%` },
  { actor: "Ops leader",     action: "Opens National Marketplace Ops", result: "3 open disputes · 2 carriers on watchlist · onboarding playbook assigned" },
  { actor: "Security lead",  action: "Opens SOC 2 Execution Tracker",  result: "3 controls in remediation · evidence request generated · gap report created" },
  { actor: "Mobile lead",    action: "Opens Mobile Launch Center",     result: "iOS 85% · Android 80% · Android Auto 58% · CarPlay entitlement pending" },
  { actor: "Revenue leader", action: "Opens Revenue Ops Maturity",     result: "Marketplace + API revenue up · concentration risk moderate" },
  { actor: "Partner mgr",    action: "Opens Strategic Partnerships",   result: "Telematics partner launch-ready · Carrier network in security review" },
  { actor: "Executive",      action: "Opens Acquisition Readiness",    result: "Data room 62% · product DD packet generated" },
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
      </div>
      <SimpleTable rows={SCENARIO} columns={[
        { key: "actor", label: "Actor" },
        { key: "action", label: "Action" },
        { key: "result", label: "Result" },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy examples</h3>
        <div className="mt-2 grid gap-1.5 text-xs">
          {RLS_EXAMPLES.map(r => (
            <div key={r.rule} className="rounded border border-white/5 p-2">
              <div className="font-medium">{r.rule}</div>
              <code className="text-[10px] text-muted-foreground">{r.predicate}</code>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Edge Function separation</h3>
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
