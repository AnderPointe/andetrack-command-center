import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid, ScoreCard, SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { TRUST_SAFETY, TRUST_EVENTS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/trust-safety")({
  head: () => ({ meta: [{ title: "Trust & Safety · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<ShieldAlert className="size-6 text-fuchsia-300" />} title="Marketplace Trust & Safety"
      blurb="Manual-review queue covering no-shows, document expirations, complaints, and suspensions. Fraud + suspicious bidding remain placeholders; no automated suspensions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Trust score" value={TRUST_SAFETY.trust_score} tone="emerald" />
        <KpiGrid cols={3} items={[
          { label: "Suspensions 30d",  value: TRUST_SAFETY.suspensions_30d },
          { label: "Reinstatements",   value: TRUST_SAFETY.reinstatements_30d },
          { label: "No-shows 30d",     value: TRUST_SAFETY.no_shows_30d },
        ]} />
      </div>
      <KpiGrid cols={3} items={[
        { label: "Doc expirations", value: TRUST_SAFETY.doc_expirations },
        { label: "Complaints open", value: TRUST_SAFETY.complaints_open },
        { label: "Policy center",   value: "Linked" },
      ]} />
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Incident timeline</h3>
        <div className="mt-2">
          <SimpleTable rows={TRUST_EVENTS} columns={[
            { key: "ts",      label: "When" },
            { key: "carrier", label: "Carrier" },
            { key: "type",    label: "Type" },
            { key: "status",  label: "Status", render: r => <StatusPill status={r.status} /> },
          ]} />
        </div>
      </Card>
    </V5Page>
  ),
});
