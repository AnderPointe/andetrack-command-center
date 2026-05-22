import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { KpiGrid, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const r = H.usePartnerRevenueGovernance();
  return (
    <V12Page icon={<Wallet className="size-6 text-cyan-300" />} title="Partner Revenue Governance" blurb="Partner revenue events, approval status, evidence attachment, and payout placeholders. No autonomous payout.">
      <KpiGrid cols={4} items={[
        { label: "Events (Q)",        value: String(r.events_q) },
        { label: "Share (Q)",         value: `$${(r.share_usd_q/1000).toFixed(0)}k` },
        { label: "Approvals pending", value: String(r.approvals_pending) },
        { label: "Evidence attached", value: `${r.evidence_attached_pct}%` },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "partner", label: "Partner" }, { key: "event", label: "Event" },
          { key: "amount_usd", label: "Amount", render: (r: any) => `$${r.amount_usd.toLocaleString()}` },
          { key: "status", label: "Status" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/partner-revenue")({
  head: () => ({ meta: [{ title: "Partner Revenue Governance · V12" }] }),
  component: Page,
});
