import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v45/ui-bits";
import { MARKETPLACE_DISPUTES } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/disputes")({
  head: () => ({ meta: [{ title: "Disputes · Anderoute" }] }),
  component: () => {
    const open = MARKETPLACE_DISPUTES.filter(d => d.status !== "Resolved").length;
    const escalated = MARKETPLACE_DISPUTES.filter(d => d.status === "Escalated").length;
    const total$ = MARKETPLACE_DISPUTES.reduce((a, b) => a + b.amount, 0);
    return (
      <V45Page icon={<AlertTriangle className="size-6 text-violet-300" />} title="Marketplace Dispute Operations"
        blurb="Open → Under Review → Waiting → Resolved / Denied / Escalated. Every dispute carries evidence + timeline.">
        <KpiGrid cols={4} items={[
          { label: "Open", value: open },
          { label: "Escalated", value: escalated },
          { label: "Amount at risk", value: `$${total$.toLocaleString()}` },
          { label: "Avg age", value: "2.4d" },
        ]} />
        <SimpleTable rows={MARKETPLACE_DISPUTES} columns={[
          { key: "id", label: "ID" },
          { key: "type", label: "Type" },
          { key: "carrier", label: "Carrier" },
          { key: "load", label: "Load" },
          { key: "amount", label: "Amount", render: r => `$${r.amount}` },
          { key: "opened", label: "Age" },
          { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
        ]} />
      </V45Page>
    );
  },
});
