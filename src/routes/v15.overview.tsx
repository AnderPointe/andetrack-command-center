import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  v15ReadinessScore, v15ReadinessBreakdown, v15Stats,
  NAV_SESSIONS, COMPANY_SUBSCRIPTIONS, WEBHOOK_DELIVERIES,
} from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/overview")({
  head: () => ({ meta: [{ title: "V1.5 Overview · Anderoute" }] }),
  component: Page,
});

function Page() {
  const score = v15ReadinessScore();
  const bd = v15ReadinessBreakdown();
  const s = v15Stats();
  return (
    <V15Page
      icon={<Rocket className="size-6 text-cyan-300" />}
      title="Anderoute V1.5 Release Center"
      blurb="Real navigation provider readiness, production billing launch, basic webhook integrations, and smarter rules-based CoPilot. Tracks readiness to ship V1.5 to paid customers."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="V1.5 readiness" value={`${score}%`} hint="weighted across 5 gates" tone={score >= 80 ? "good" : score >= 65 ? "warn" : "bad"} />
        <StatTile label="Active sessions" value={s.sessionsActive} hint={`${s.offRoute} off-route`} tone={s.offRoute ? "warn" : "good"} />
        <StatTile label="Subscriptions" value={`${s.subActive} active`} hint={`${s.subTrialing} trial · ${s.subPastDue} past due`} tone={s.subPastDue ? "warn" : "good"} />
        <StatTile label="Security" value={`${s.securityOk}/${s.securityTotal}`} tone={s.securityOk >= s.securityTotal - 2 ? "good" : "warn"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">V1.5 readiness composition</h2>
        <div className="mt-3 space-y-3">
          {bd.map((b) => (
            <div key={b.id}>
              <div className="flex items-center justify-between text-xs">
                <span>{b.label} <span className="text-muted-foreground">· weight {b.weight}</span></span>
                <span className={b.pct >= 85 ? "text-emerald-300" : b.pct >= 65 ? "text-sky-300" : "text-amber-300"}>{b.pct}%</span>
              </div>
              <Progress value={b.pct} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Where to go next</h2>
        <ul className="mt-2 grid gap-1 text-muted-foreground md:grid-cols-2">
          <li>· <Link to="/v15/navigation" className="text-cyan-300 hover:underline">Nav providers</Link> — Mapbox / Google boundary</li>
          <li>· <Link to="/v15/sessions" className="text-cyan-300 hover:underline">Sessions</Link> — {NAV_SESSIONS.length} tracked</li>
          <li>· <Link to="/v15/billing" className="text-cyan-300 hover:underline">Billing</Link> — {COMPANY_SUBSCRIPTIONS.length} accounts</li>
          <li>· <Link to="/v15/webhooks" className="text-cyan-300 hover:underline">Webhooks</Link> — {WEBHOOK_DELIVERIES.length} deliveries</li>
          <li>· <Link to="/v15/copilot" className="text-cyan-300 hover:underline">CoPilot V1.5</Link> — operational insights</li>
          <li>· <Link to="/v15/demo" className="text-cyan-300 hover:underline">Demo flow</Link> — V1.5 end-to-end</li>
        </ul>
      </Card>
    </V15Page>
  );
}
