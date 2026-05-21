import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { Progress } from "@/components/ui/progress";
import {
  COMPANY_SUBSCRIPTIONS, BILLING_INVOICES, USAGE_METERS, v15Stats,
} from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/billing")({
  head: () => ({ meta: [{ title: "V1.5 Billing · Anderoute" }] }),
  component: Page,
});

const subTone: Record<string, string> = {
  active:    "border-emerald-500/30 text-emerald-300",
  trialing:  "border-sky-500/30 text-sky-300",
  past_due:  "border-rose-500/30 text-rose-300",
  unpaid:    "border-rose-500/30 text-rose-300",
  cancelled: "border-white/15 text-muted-foreground",
  incomplete:"border-amber-500/30 text-amber-300",
  paused:    "border-white/15 text-muted-foreground",
};

const invTone: Record<string, string> = {
  paid:   "border-emerald-500/30 text-emerald-300",
  open:   "border-sky-500/30 text-sky-300",
  failed: "border-rose-500/30 text-rose-300",
  void:   "border-white/15 text-muted-foreground",
};

function Page() {
  const s = v15Stats();
  return (
    <V15Page
      icon={<CreditCard className="size-6 text-cyan-300" />}
      title="Billing Production Launch"
      blurb="Stripe-backed subscriptions, invoices, and usage meters. Past-due, trial expiry, and plan-limit warnings all surface here before they reach the customer."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Active subs" value={s.subActive} tone="good" />
        <StatTile label="Trialing" value={s.subTrialing} tone="info" />
        <StatTile label="Past due" value={s.subPastDue} tone={s.subPastDue ? "bad" : "good"} />
        <StatTile label="Failed invoices" value={BILLING_INVOICES.filter((i) => i.status === "failed").length} tone="bad" />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Subscriptions</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">Company</th><th className="p-2">Plan</th><th className="p-2">Status</th><th className="p-2">Detail</th><th className="p-2">Amount</th><th className="p-2">Stripe ID</th></tr>
          </thead>
          <tbody>
            {COMPANY_SUBSCRIPTIONS.map((c) => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="p-2">{c.company}</td>
                <td className="p-2 capitalize">{c.plan}</td>
                <td className="p-2"><Badge variant="outline" className={subTone[c.status]}>{c.status}</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">
                  {c.trialEnds ? `Trial ends ${c.trialEnds}` : c.renewsAt ? `Renews ${c.renewsAt}` : c.pastDueDays ? `${c.pastDueDays}d past due` : "—"}
                </td>
                <td className="p-2">${c.amount}</td>
                <td className="p-2 font-mono text-xs text-muted-foreground">{c.stripeCustomerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Invoices</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-2">ID</th><th className="p-2">Company</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Issued</th><th className="p-2">Paid</th></tr>
          </thead>
          <tbody>
            {BILLING_INVOICES.map((i) => (
              <tr key={i.id} className="border-t border-white/10">
                <td className="p-2 font-mono text-xs">{i.id}</td>
                <td className="p-2">{i.company}</td>
                <td className="p-2">${i.amount}</td>
                <td className="p-2"><Badge variant="outline" className={invTone[i.status]}>{i.status}</Badge></td>
                <td className="p-2 text-xs text-muted-foreground">{i.issuedAt}</td>
                <td className="p-2 text-xs text-muted-foreground">{i.paidAt ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Usage meters</h2>
        <div className="mt-3 space-y-3">
          {USAGE_METERS.map((m) => {
            const pct = Math.round((m.used / m.limit) * 100);
            const tone = pct >= 90 ? "text-rose-300" : pct >= 75 ? "text-amber-300" : "text-emerald-300";
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs">
                  <span>{m.label}</span>
                  <span className={tone}>{m.used}/{m.limit} {m.unit} · {pct}%</span>
                </div>
                <Progress value={pct} className="mt-1 h-1.5" />
              </div>
            );
          })}
        </div>
      </Card>
    </V15Page>
  );
}
