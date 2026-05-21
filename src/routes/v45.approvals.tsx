import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { APPROVAL_QUEUE } from "@/v45/data/mockPhase22";

export const Route = createFileRoute("/v45/approvals")({
  head: () => ({ meta: [{ title: "Approval Center · Anderoute" }] }),
  component: () => {
    const pending = APPROVAL_QUEUE.filter(a => a.status === "pending").length;
    const approved = APPROVAL_QUEUE.filter(a => a.status === "approved").length;
    const escalated = APPROVAL_QUEUE.filter(a => a.status === "escalated").length;
    return (
      <V45Page icon={<ShieldCheck className="size-6 text-violet-300" />} title="Human-Approved Automation Center"
        blurb="Automation recommends → user reviews explanation → approve/reject → execute → audit-logged outcome. High-risk actions always require human approval.">
        <KpiGrid cols={4} items={[
          { label: "Pending", value: pending },
          { label: "Approved (today)", value: approved },
          { label: "Escalated", value: escalated },
          { label: "Avg time to decide", value: "1m 42s" },
        ]} />
        <SimpleTable rows={APPROVAL_QUEUE} columns={[
          { key: "id", label: "ID" },
          { key: "type", label: "Action" },
          { key: "load", label: "Load" },
          { key: "confidence", label: "Confidence", render: r => `${Math.round(r.confidence * 100)}%` },
          { key: "requested_by", label: "Requested by" },
          { key: "explanation", label: "Why" },
          { key: "status", label: "Status", render: r => <StatusPill status={r.status} /> },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
          Audit trail mock: every approval is written to <code>automation_outcomes</code> with actor, decision, timestamp, and downstream effect.
        </Card>
      </V45Page>
    );
  },
});
