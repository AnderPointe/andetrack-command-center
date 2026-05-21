import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/v15/stripe")({
  head: () => ({ meta: [{ title: "V1.5 Stripe Edge Plan · Anderoute" }] }),
  component: Page,
});

const FUNCTIONS = [
  ["create-checkout-session",       "Server fn · creates Stripe Checkout session for selected plan"],
  ["create-customer-portal-session","Server fn · returns customer portal URL for the company admin"],
  ["sync-subscription-status",      "Server fn · pulls latest subscription state from Stripe"],
  ["record-billing-usage",          "Server fn · increments usage meters atomically"],
  ["enforce-plan-limits",           "Server fn · checks usage vs plan; emits plan_limit_event"],
  ["handle-past-due-subscription",  "Server fn · enters grace window + alerts admin"],
  ["handle-cancelled-subscription", "Server fn · downgrades features + preserves data"],
  ["stripe-webhook (public route)", "src/routes/api/public/stripe-webhook.ts · verifies Stripe-Signature"],
];

const EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.created",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.updated",
];

function Page() {
  return (
    <V15Page
      icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="Stripe Edge Function Plan"
      blurb="Stripe secret keys live only inside server functions and webhook routes. Every webhook verifies the signature before doing any work and every billing change creates an audit log."
    >
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Trust boundary</Badge>{" "}
        Browser → server fn → Stripe → webhook route. <span className="font-mono">STRIPE_SECRET_KEY</span> never reaches the client.
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Functions</h2>
        <div className="mt-3 space-y-2 text-sm">
          {FUNCTIONS.map(([name, desc]) => (
            <div key={name} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="font-mono text-xs">{name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Webhook events handled</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {EVENTS.map((e) => (
            <Badge key={e} variant="outline" className="border-white/15 text-xs text-muted-foreground">{e}</Badge>
          ))}
        </div>
      </Card>
    </V15Page>
  );
}
