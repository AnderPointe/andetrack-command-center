import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/settings/billing")({
  head: () => ({ meta: [{ title: "Billing — Anderoute" }] }),
  component: Billing,
});

const PLANS = [
  { code: "starter", name: "Starter", price: 49, features: ["5 drivers", "5 vehicles", "Basic dispatch", "GPS tracking", "Customer portal"] },
  { code: "professional", name: "Professional", price: 199, features: ["25 drivers", "25 vehicles", "Live map", "CoPilot AI", "Push notifications", "Reports"], highlight: true },
  { code: "fleet", name: "Fleet Command", price: 599, features: ["100 drivers", "100 vehicles", "CDL validation", "Advanced alerts", "Multi-dispatch", "Priority support"] },
  { code: "enterprise", name: "Enterprise", price: null, features: ["Unlimited", "Dedicated support", "Custom integrations", "API access", "White-label portal"] },
];

const USAGE = [
  { label: "Active drivers", value: "18 / 25" },
  { label: "Vehicles", value: "14 / 25" },
  { label: "GPS events (mo)", value: "284,012" },
  { label: "CoPilot commands", value: "1,847" },
  { label: "Push sent", value: "3,201" },
  { label: "Portal users", value: "12" },
];

function Billing() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing & Subscription</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Current plan, usage, invoices, and Stripe portal.</p>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Current plan</div>
              <div className="mt-1 text-xl font-semibold">Professional — $199/mo</div>
              <div className="text-xs text-muted-foreground">Renews May 31 · Trial ended</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Open Stripe portal</Button>
              <Button size="sm">Upgrade</Button>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Usage this month</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {USAGE.map((u) => (
              <Card key={u.label} className="p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{u.label}</div>
                <div className="mt-1 text-base font-semibold tabular-nums">{u.value}</div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Plan comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {PLANS.map((p) => (
              <Card key={p.code} className={`p-4 ${p.highlight ? "border-teal-400/40 shadow-[0_0_24px_-12px_theme(colors.teal.500)]" : ""}`}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.name}</div>
                <div className="mt-1 text-2xl font-semibold">{p.price ? `$${p.price}` : "Custom"}<span className="text-xs text-muted-foreground">{p.price ? "/mo" : ""}</span></div>
                <ul className="mt-3 space-y-1.5 text-xs">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5"><Check className="size-3 text-teal-300" /> {f}</li>
                  ))}
                </ul>
                <Button size="sm" variant={p.highlight ? "default" : "outline"} className="mt-4 w-full">
                  {p.highlight ? "Current plan" : "Choose"}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Invoice history</h2>
          <div className="text-sm text-muted-foreground">No invoices yet. Connect Stripe to sync billing.</div>
        </Card>
      </div>
    </AppShell>
  );
}
