import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { BILLING_SECURITY_CHECKLIST, STRIPE_TRUST_BOUNDARY } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/stripe")({
  head: () => ({ meta: [{ title: "Stripe Integration Boundary · Anderoute" }] }),
  component: Page,
});

const EDGE_FUNCTIONS = [
  "create-stripe-checkout-session",
  "create-stripe-customer-portal-session",
  "stripe-webhook (signature verified)",
  "sync-subscription-status",
  "record-billing-usage",
  "sync-invoice-history",
];

function Page() {
  const done = BILLING_SECURITY_CHECKLIST.filter((c) => c.done).length;
  const pct = Math.round((done / BILLING_SECURITY_CHECKLIST.length) * 100);
  return (
    <V11Page
      icon={<ShieldCheck className="size-6 text-fuchsia-300" />}
      title="Stripe Integration Boundary"
      blurb="Every Stripe call routes through a server function. Secret key never reaches the browser. Webhook signature is verified before any database write."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Security controls" value={`${done}/${BILLING_SECURITY_CHECKLIST.length}`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Coverage" value={`${pct}%`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Open items" value={BILLING_SECURITY_CHECKLIST.length - done} tone={done < BILLING_SECURITY_CHECKLIST.length ? "warn" : "good"} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Trust boundary — where Stripe runs</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {STRIPE_TRUST_BOUNDARY.map((l) => (
            <div key={l.layer} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">{l.layer}</div>
                <Badge variant="outline" className={l.secret ? "border-rose-500/30 text-rose-300" : "border-emerald-500/30 text-emerald-300"}>
                  {l.secret ? "Secret zone" : "Safe"}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{l.runs}</div>
              <div className="mt-1 text-xs">{l.note}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Server endpoints</h2>
        <ul className="mt-3 grid gap-1.5 text-sm font-mono text-muted-foreground md:grid-cols-2">
          {EDGE_FUNCTIONS.map((fn) => <li key={fn}>· {fn}</li>)}
        </ul>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Security checklist</h2>
        <div className="mt-3 space-y-2 text-sm">
          {BILLING_SECURITY_CHECKLIST.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span>{c.label}</span>
              <Badge variant="outline" className={c.done ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {c.done ? "OK" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h2 className="font-semibold">Docs to ship with V1.1</h2>
        <ul className="mt-2 list-disc pl-5 text-muted-foreground">
          <li><code>docs/billing/stripe-setup.md</code></li>
          <li><code>docs/billing/subscription-flow.md</code></li>
          <li><code>docs/billing/webhook-security.md</code></li>
        </ul>
      </Card>
    </V11Page>
  );
}
