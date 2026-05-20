import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BILLING_OVERVIEW, BILLING_INVOICES, PLANS } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/billing")({
  head: () => ({ meta: [{ title: "V1.1 Billing · Anderoute" }] }),
  component: Page,
});

function meter(used: number, limit: number) {
  return Math.min(100, Math.round((used / limit) * 100));
}

function Page() {
  const b = BILLING_OVERVIEW;
  return (
    <V11Page
      icon={<CreditCard className="size-6 text-fuchsia-300" />}
      title="Billing Activation"
      blurb="Trial → paid readiness. Subscription status, plan, usage meters, invoices, and billing contact. Stripe wiring lives behind Edge Functions; nothing sensitive in this UI."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Subscription" value={b.status.toUpperCase()} hint={`Plan: ${b.plan}`} tone={b.status === "active" ? "good" : b.status === "trial" ? "warn" : "bad"} />
        <StatTile label="Trial ends" value={new Date(b.trialEndsIso).toLocaleDateString()} tone="info" />
        <StatTile label="Drivers used" value={`${b.usage.drivers.used}/${b.usage.drivers.limit}`} tone={meter(b.usage.drivers.used, b.usage.drivers.limit) > 90 ? "warn" : "good"} />
        <StatTile label="Loads MTD" value={`${b.usage.loadsThisMo.used}/${b.usage.loadsThisMo.limit}`} tone={meter(b.usage.loadsThisMo.used, b.usage.loadsThisMo.limit) > 90 ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Usage meters</h2>
        <div className="mt-3 space-y-3">
          {Object.entries(b.usage).map(([k, v]) => (
            <div key={k}>
              <div className="flex items-center justify-between text-xs">
                <span className="capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                <span>{v.used} / {v.limit}</span>
              </div>
              <Progress value={meter(v.used, v.limit)} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Plan comparison</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className={`rounded-lg border p-3 ${p.recommended ? "border-fuchsia-500/40 bg-fuchsia-500/[0.04]" : "border-white/10 bg-black/20"}`}>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                {p.recommended && <Badge variant="outline" className="border-fuchsia-500/40 text-fuchsia-300">Recommended</Badge>}
              </div>
              <div className="mt-2 text-2xl font-semibold">${p.monthlyUsd}<span className="text-sm text-muted-foreground">/mo</span></div>
              <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                <li>{p.drivers} drivers · {p.loadsPerMo} loads/mo</li>
                <li>{p.copilot ? "✓ CoPilot included" : "— CoPilot add-on"}</li>
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Invoices</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">Invoice</th><th className="p-2">Period</th><th className="p-2">Amount</th><th className="p-2">Status</th></tr>
          </thead>
          <tbody>
            {BILLING_INVOICES.map((i) => (
              <tr key={i.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{i.id}</td>
                <td className="p-2">{i.periodIso}</td>
                <td className="p-2">${i.amountUsd.toFixed(2)}</td>
                <td className="p-2"><Badge variant="outline" className="border-white/15 text-muted-foreground">{i.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Billing contact</h2>
        <p className="mt-1 text-muted-foreground">{b.billingContact.name} · {b.billingContact.email}</p>
      </Card>
    </V11Page>
  );
}
