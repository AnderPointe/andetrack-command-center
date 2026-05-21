import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { KpiGrid, SimpleTable } from "@/components/v65/ui-bits";
import { Card } from "@/components/ui/card";
import { useBillingControls, useBillingTrend } from "@/v65/hooks";

export const Route = createFileRoute("/v65/billing")({
  head: () => ({ meta: [{ title: "Billing Controls · V6.5 · Anderoute" }] }),
  component: () => {
    const { billing, failed, audit } = useBillingControls();
    const { trend } = useBillingTrend();
    const maxInv = Math.max(...trend.map(t => t.invoices));
    return (
      <V65Page icon={<Receipt className="size-6 text-cyan-300" />} title="Billing Controls Dashboard"
        blurb="Active, trial, past-due, cancelled subscriptions; failed payments; usage events; marketplace fees; API overages; webhook health; billing audit. Figures are placeholders.">
        <KpiGrid cols={4} items={[
          { label: "Active subs",   value: billing.subs_active },
          { label: "Trial subs",    value: billing.subs_trial },
          { label: "Past-due",      value: billing.subs_past_due },
          { label: "Cancelled",     value: billing.subs_cancelled },
          { label: "Failed payments", value: billing.failed_payments },
          { label: "Manual plan changes", value: billing.manual_plan_changes },
          { label: "Usage events",  value: billing.usage_events.toLocaleString() },
          { label: "Marketplace fees", value: billing.marketplace_fees },
          { label: "API overages",  value: billing.api_overages },
          { label: "Disputes",      value: billing.disputes },
          { label: "Webhook failures", value: billing.webhook_failures },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">7-day billing activity</h3>
          <div className="mt-3 flex items-end gap-2 h-24">
            {trend.map(t => (
              <div key={t.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t bg-cyan-400/60" style={{ height: `${(t.invoices / maxInv) * 100}%` }} />
                <div className="text-[10px] text-muted-foreground">{t.day}</div>
                <div className="font-mono text-[10px] text-cyan-300">{t.invoices}</div>
                {t.failed > 0 && <div className="text-[9px] text-rose-300">{t.failed} fail</div>}
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Failed payment queue</h3>
          <div className="mt-2">
            <SimpleTable rows={failed} columns={[
              { key: "sub",        label: "Subscription" },
              { key: "customer",   label: "Customer" },
              { key: "amount",     label: "Amount (pl)" },
              { key: "attempts",   label: "Attempts" },
              { key: "last_error", label: "Last error" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Billing audit events</h3>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {audit.map((e, i) => (
              <li key={i}><span className="font-mono text-cyan-300/80">{e.ts}</span> · {e.event} · {e.ref}</li>
            ))}
          </ul>
        </Card>
      </V65Page>
    );
  },
});
