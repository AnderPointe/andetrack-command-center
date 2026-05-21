import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SUBSCRIPTION_PLANS, FEATURE_GATES, USAGE_METERS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/plan-limits")({
  head: () => ({ meta: [{ title: "V1.5 Plan Limits · Anderoute" }] }),
  component: Page,
});

function Cell({ ok }: { ok: boolean }) {
  return <span className={ok ? "text-emerald-300" : "text-muted-foreground"}>{ok ? "✓" : "—"}</span>;
}

function Page() {
  return (
    <V15Page
      icon={<Lock className="size-6 text-cyan-300" />}
      title="Plan Limits & Feature Gates"
      blurb="PlanLimitService enforces driver, vehicle, load, CoPilot, and nav-session limits on the server. FeatureGateService gates portal, CoPilot, advanced reports, navigation routing, CSV imports, webhooks, and priority support."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Plans</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-2">Plan</th><th className="p-2">Price/mo</th>
              <th className="p-2">Drivers</th><th className="p-2">Vehicles</th>
              <th className="p-2">Loads/mo</th><th className="p-2">CoPilot</th>
              <th className="p-2">Nav sessions</th><th className="p-2">Portal users</th>
            </tr>
          </thead>
          <tbody>
            {SUBSCRIPTION_PLANS.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-2 font-medium">{p.name}</td>
                <td className="p-2">${p.priceMonthly}</td>
                <td className="p-2">{p.drivers}</td>
                <td className="p-2">{p.vehicles}</td>
                <td className="p-2">{p.loadsPerMonth}</td>
                <td className="p-2">{p.copilotUsage}</td>
                <td className="p-2">{p.navSessions}</td>
                <td className="p-2">{p.portalUsers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Feature matrix</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">Feature</th><th className="p-2">Starter</th><th className="p-2">Growth</th><th className="p-2">Professional</th></tr>
          </thead>
          <tbody>
            {FEATURE_GATES.map((f) => (
              <tr key={f.id} className="border-t border-white/10">
                <td className="p-2">{f.label}</td>
                <td className="p-2"><Cell ok={f.starter} /></td>
                <td className="p-2"><Cell ok={f.growth} /></td>
                <td className="p-2"><Cell ok={f.professional} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Current usage (Growth plan)</h2>
        <div className="mt-3 space-y-3">
          {USAGE_METERS.map((m) => {
            const pct = Math.round((m.used / m.limit) * 100);
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs">
                  <span>{m.label}</span>
                  <span className={pct >= 90 ? "text-rose-300" : pct >= 75 ? "text-amber-300" : "text-emerald-300"}>{m.used}/{m.limit}</span>
                </div>
                <Progress value={pct} className="mt-1 h-1.5" />
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Hooks &amp; components</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["usePlanLimits()", "useFeatureGate()", "FeatureLockedCard", "PlanUpgradePrompt", "UsageLimitBanner", "PlanLimitMeter"].map((x) => (
            <Badge key={x} variant="outline" className="border-white/15 text-xs">{x}</Badge>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
