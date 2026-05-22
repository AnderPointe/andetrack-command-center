import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Procurement and Security Sales Center";
const BLURB = "Procurement requests, security questionnaire queue, vendor reviews, blockers, customer approval timeline.";

function Page() {
  const p = H.useProcurementSecuritySales();
  return (
    <V10Page icon={<ClipboardCheck className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Open requests" value={p.summary.open} tone="sky" />
        <ScoreCard label="Blocked"       value={p.summary.blocked} tone="rose" />
        <ScoreCard label="Total in queue" value={p.requests.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Procurement request board</h3>
        <SimpleTable rows={p.requests as any} columns={[
          { key: "customer", label: "Customer" }, { key: "item", label: "Item" },
          { key: "owner", label: "Owner" }, { key: "due", label: "Due" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-rose-400/30 bg-rose-500/5 p-4">
        <h3 className="text-sm font-semibold text-rose-200">Blockers</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {p.blockers.map(b => <li key={b.id} className="rounded border border-rose-400/20 bg-black/20 px-3 py-1.5"><span className="text-rose-200">{b.deal}</span> — {b.reason}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/procurement")({
  head: () => ({ meta: [{ title: "Procurement and Security Sales Center · Anderoute V10" }] }),
  component: Page,
});
