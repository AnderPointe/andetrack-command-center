import { createFileRoute } from "@tanstack/react-router";
import { DollarSign } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { REVENUE_LINES, RENEWAL_PIPELINE, EXPANSION_PIPELINE } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/revenue-ops")({
  head: () => ({ meta: [{ title: "Revenue Ops · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<DollarSign className="size-6 text-fuchsia-300" />} title="Mature Revenue Operations"
      blurb="Revenue by product line, renewal pipeline, expansion pipeline, and revenue-risk view. ARR / NRR are placeholders.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue by line</h3>
        <div className="mt-2">
          <SimpleTable rows={REVENUE_LINES} columns={[
            { key: "line",  label: "Line" },
            { key: "value", label: "Value" },
            { key: "trend", label: "Trend" },
            { key: "note",  label: "Notes" },
          ]} />
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Renewal pipeline</h3>
          <div className="mt-2">
            <SimpleTable rows={RENEWAL_PIPELINE} columns={[
              { key: "customer",      label: "Customer" },
              { key: "renewal_date",  label: "Renewal" },
              { key: "health",        label: "Health", render: r => <StatusPill status={r.health} /> },
              { key: "risk",          label: "Risk",   render: r => <StatusPill status={r.risk} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Expansion pipeline</h3>
          <div className="mt-2">
            <SimpleTable rows={EXPANSION_PIPELINE} columns={[
              { key: "customer",    label: "Customer" },
              { key: "opportunity", label: "Opportunity" },
              { key: "value",       label: "Value" },
              { key: "stage",       label: "Stage", render: r => <StatusPill status={r.stage} /> },
            ]} />
          </div>
        </Card>
      </div>
    </V5Page>
  ),
});
