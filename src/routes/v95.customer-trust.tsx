import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const t = H.useGlobalCustomerTrust();
  return (
    <V95Page icon={<Users className="size-6 text-cyan-300" />} title="Global Customer Trust Dashboard" blurb="Customer trust, procurement packet status, control pack status, AI disclosure, renewal/expansion readiness, reference readiness.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Customer trust" value={t.summary.score} tone="emerald" />
        <ScoreCard label="Customers"      value={t.customers.length} tone="sky" />
        <ScoreCard label="Open requests"  value={t.requests.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Customers</h3>
        <div className="mt-2">
          <SimpleTable rows={t.customers as any} columns={[
            { key: "customer", label: "Customer" },
            { key: "trust", label: "Trust", render: (r: any) => `${r.trust}%` },
            { key: "packet", label: "Packet", render: (r: any) => <StatusPill status={r.packet} /> },
            { key: "sla", label: "SLA", render: (r: any) => <StatusPill status={r.sla} /> },
            { key: "renewal", label: "Renewal", render: (r: any) => <StatusPill status={r.renewal} /> },
            { key: "reference", label: "Reference", render: (r: any) => <StatusPill status={r.reference} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-cyan-400/30 bg-cyan-500/5 p-4">
        <h3 className="text-sm font-semibold text-cyan-200">Customer security & trust requests</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {t.requests.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-3 py-2">
              <div><div><span className="text-cyan-200">{r.customer}</span> — {r.item}</div><div className="text-xs text-muted-foreground">owner: {r.owner}</div></div>
              <StatusPill status={r.status} />
            </li>
          ))}
        </ul>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/customer-trust")({
  head: () => ({ meta: [{ title: "Customer Trust · Anderoute V9.5" }] }),
  component: Page,
});
