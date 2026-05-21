import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SETTLEMENTS, SETTLEMENT_PIPELINE, SETTLEMENT_AGING } from "@/v35/data/mockPhase20";

const COLOR: Record<string, string> = {
  ready_for_payment: "border-emerald-500/40 text-emerald-300",
  approved: "border-emerald-500/40 text-emerald-300",
  pending_pod: "border-sky-500/40 text-sky-300",
  disputed: "border-rose-500/40 text-rose-300",
};

export const Route = createFileRoute("/v35/carrier-settlement")({
  head: () => ({ meta: [{ title: "Carrier Settlement · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<Wallet className="size-6 text-amber-300" />} title="Carrier Settlement (placeholder)"
      blurb="Settlement workflow shell: POD-bound, approval-gated, with pipeline and aging views. No real payouts are issued.">
      <Card className="border-amber-500/30 bg-amber-500/[0.04] p-3 text-sm text-amber-100/90">
        <Badge variant="outline" className="border-amber-500/40 text-amber-300">Placeholder</Badge>{" "}
        Settlement / payout / factoring integrations remain deferred. All approvals require human action.
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Pipeline</h3>
          <ul className="mt-2 space-y-1 text-sm">{SETTLEMENT_PIPELINE.map((s) => (
            <li key={s.stage} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
              <span>{s.stage}</span>
              <span className="font-mono text-xs"><span className="text-amber-300">{s.count}</span> · ${s.value.toLocaleString()}</span>
            </li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Aging (placeholder)</h3>
          <ul className="mt-2 space-y-1 text-sm">{SETTLEMENT_AGING.map((a) => (
            <li key={a.bucket} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5">
              <span>{a.bucket}</span>
              <span className="font-mono text-xs"><span className="text-amber-300">{a.count}</span> · ${a.value.toLocaleString()}</span>
            </li>
          ))}</ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Load</th><th className="p-1">Carrier</th><th className="p-1">Rate</th><th className="p-1">Status</th><th className="p-1">Approved by</th><th className="p-1">Approved at</th></tr></thead>
          <tbody>{SETTLEMENTS.map((s) => (
            <tr key={s.id} className="border-t border-white/10">
              <td className="p-1 font-mono text-xs">{s.load}</td><td className="p-1">{s.carrier}</td>
              <td className="p-1 font-mono">${s.rate}</td>
              <td className="p-1"><Badge variant="outline" className={COLOR[s.status] || ""}>{s.status}</Badge></td>
              <td className="p-1">{s.approved_by}</td><td className="p-1 text-xs text-muted-foreground">{s.approved_at}</td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
