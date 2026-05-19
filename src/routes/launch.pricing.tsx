import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { LaunchNav } from "@/components/launch/LaunchNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS, ADDONS } from "@/launch/data/mockLaunch";
import { DollarSign, Check } from "lucide-react";

export const Route = createFileRoute("/launch/pricing")({
  head: () => ({ meta: [{ title: "Pricing Strategy — Anderoute" }] }),
  component: Pricing,
});

function Pricing() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-teal-500/40 text-teal-300">Phase 10 · Pricing</Badge>
          <div className="flex items-center gap-3">
            <DollarSign className="size-6 text-teal-300" />
            <h1 className="text-2xl font-semibold">Pricing Strategy</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Per-driver, per-seat, and usage-based ranges. Final prices to be validated with customer interviews
            and pilot conversion data. <span className="text-amber-300">Ranges are placeholders, not commitments.</span>
          </p>
          <LaunchNav />
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((t) => (
            <Card key={t.id} className={`border bg-white/[0.02] p-5 ${t.popular ? "border-teal-400/40" : "border-white/10"}`}>
              {t.popular && <Badge className="mb-2 bg-teal-500/15 text-teal-200 hover:bg-teal-500/15">Most popular</Badge>}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.audience}</p>
              <div className="mt-3 text-2xl font-semibold text-teal-200">{t.priceRange}</div>
              {t.perSeat && <div className="text-xs text-muted-foreground">{t.perSeat}</div>}
              <ul className="mt-4 space-y-1.5 text-xs">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full" variant={t.popular ? "default" : "outline"} size="sm">{t.cta}</Button>
            </Card>
          ))}
        </section>

        <Card className="border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium">Add-ons</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {ADDONS.map((a) => (
              <div key={a.name} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.01] p-3 text-sm">
                <div>
                  <div className="font-medium">{a.name}</div>
                  {a.note && <div className="text-xs text-muted-foreground">{a.note}</div>}
                </div>
                <span className="text-xs text-teal-200">{a.price}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.02] p-5 text-xs text-muted-foreground">
          <strong className="text-foreground">Trial & pilot strategy.</strong> 14-day trial for Starter/Professional.
          Structured 30/60/90-day pilots for Fleet Command and Enterprise with success metrics, weekly check-ins,
          and a defined conversion plan. Annual discount: ~15–20% (to be validated). Implementation fees:
          per-engagement, scoped to data import + integrations.
        </Card>
      </div>
    </AppShell>
  );
}
