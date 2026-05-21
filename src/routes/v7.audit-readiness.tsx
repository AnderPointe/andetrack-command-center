import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useFinancialAuditReadiness } from "@/v7/hooks";

export const Route = createFileRoute("/v7/audit-readiness")({
  head: () => ({ meta: [{ title: "Financial Audit Readiness · V7 · Anderoute" }] }),
  component: () => {
    const { audit } = useFinancialAuditReadiness();
    return (
      <V7Page icon={<Receipt className="size-6 text-indigo-300" />} title="Financial Audit Readiness (Placeholder)"
        blurb="Tracks evidence checklist for revenue events, invoices, subscriptions, marketplace fees, API usage, manual adjustments, refunds, payments, webhooks, reconciliation. Readiness is NOT asserted.">
        <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4 text-xs text-amber-100/90">
          Placeholder: do not represent financial audit as complete or certified.
        </Card>
        <ScoreCard label="Audit readiness placeholder" value={audit.score} tone="rose" />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={audit.checklist as any} columns={[
            { key: "item",   label: "Evidence item" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
      </V7Page>
    );
  },
});
