import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BILLING_SECURITY_CHECKLIST } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/stripe")({
  head: () => ({ meta: [{ title: "Stripe Integration Boundary · Anderoute" }] }),
  component: Page,
});

const EDGE_FUNCTIONS = [
  "create-stripe-checkout-session",
  "create-stripe-customer-portal-session",
  "stripe-webhook",
  "sync-subscription-status",
  "record-billing-usage",
  "sync-invoice-history",
];

function Page() {
  return (
    <V11Page
      icon={<ShieldCheck className="size-6 text-fuchsia-300" />}
      title="Stripe Integration Boundary"
      blurb="Every Stripe call routes through a server function. Secret keys never reach the browser. Webhooks verify signature before any database write."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Server functions / Edge endpoints</h2>
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
