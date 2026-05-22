import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const p = H.useProcurementTrust();
  return (
    <V95Page icon={<Briefcase className="size-6 text-cyan-300" />} title="Enterprise Procurement Trust Center" blurb="Security questionnaires, procurement/vendor packets, legal/insurance/DPA placeholders, AI disclosure, API/EDI security packet, mobile permission packet.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Procurement readiness" value={p.summary.readiness} tone="emerald" />
        <ScoreCard label="Open requests"          value={p.summary.open_requests} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Trust packets</h3>
        <div className="mt-2">
          <SimpleTable rows={p.packets as any} columns={[
            { key: "item", label: "Item" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-cyan-200">Customer security & procurement requests</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {p.requests.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-3 py-2">
              <span><span className="text-cyan-200">{r.customer}</span> — {r.item} (owner: {r.owner})</span>
              <StatusPill status={r.status} />
            </li>
          ))}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/procurement")({
  head: () => ({ meta: [{ title: "Procurement Trust · Anderoute V9.5" }] }),
  component: Page,
});
