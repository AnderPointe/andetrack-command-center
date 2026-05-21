import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V45Page } from "@/components/v45/V45Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v45/ui-bits";
import { Card } from "@/components/ui/card";
import { APPROVAL_QUEUE } from "@/v45/data/mockPhase22";

const FLOW = [
  { step: "1. Recommend", who: "AI / Automation", detail: "Action + confidence + explanation + data sources" },
  { step: "2. Review",    who: "Human user",      detail: "Read explanation, inspect impact, decide" },
  { step: "3. Decide",    who: "Human user",      detail: "Approve · Reject · Escalate" },
  { step: "4. Execute",   who: "System",          detail: "Performs action only on approval" },
  { step: "5. Audit",     who: "System",          detail: "Writes actor, decision, ts, outcome to audit log" },
];

export const Route = createFileRoute("/v45/approvals")({
  head: () => ({ meta: [{ title: "Approval Center · Anderoute" }] }),
  component: () => {
    const pending   = APPROVAL_QUEUE.filter(a => a.status === "pending").length;
    const approved  = APPROVAL_QUEUE.filter(a => a.status === "approved").length;
    const escalated = APPROVAL_QUEUE.filter(a => a.status === "escalated").length;
    const highConf  = APPROVAL_QUEUE.filter(a => a.confidence >= 0.95).length;
    return (
      <V45Page icon={<ShieldCheck className="size-6 text-violet-300" />} title="Human-Approved Automation Center"
        blurb="Automation recommends → user reviews explanation → approve/reject → execute → audit-logged outcome. High-risk actions always require human approval.">
        <KpiGrid cols={5} items={[
          { label: "Pending", value: pending },
          { label: "Approved (today)", value: approved },
          { label: "Escalated", value: escalated },
          { label: "Confidence ≥ 95%", value: highConf },
          { label: "Avg time to decide", value: "1m 42s" },
        ]} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Approval flow</h3>
          <ol className="mt-2 grid gap-2 md:grid-cols-5">
            {FLOW.map(f => (
              <li key={f.step} className="rounded border border-white/10 bg-white/[0.02] p-2 text-xs">
                <div className="font-medium">{f.step}</div>
                <div className="text-[10px] text-violet-300">{f.who}</div>
                <div className="mt-1 text-muted-foreground text-[11px]">{f.detail}</div>
              </li>
            ))}
          </ol>
        </Card>

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
          Audit trail mock: every approval is written to <code>automation_outcomes</code> with actor, decision, timestamp, and downstream effect. RLS scopes records to <code>company_id</code>; security leads see all decisions, ops users see their own queue.
        </Card>
      </V45Page>
    );
  },
});
