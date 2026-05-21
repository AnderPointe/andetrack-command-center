import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { SUPPLY_DEMAND, EQUIPMENT_DEMAND, CARRIER_GAP_RECS, NATIONAL_ALERTS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/supply-demand")({
  head: () => ({ meta: [{ title: "Supply / Demand · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Scale className="size-6 text-fuchsia-300" />} title="Carrier Supply & Demand Balance"
      blurb="Regional and equipment supply/demand signals. Negative balance = unmet demand. Demand forecasting is a placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Regional balance</h3>
        <div className="mt-2">
          <SimpleTable rows={SUPPLY_DEMAND} columns={[
            { key: "region",  label: "Region" },
            { key: "supply",  label: "Supply" },
            { key: "demand",  label: "Demand" },
            { key: "balance", label: "Balance", render: r => (
              <span className={r.balance < 0 ? "text-rose-300" : "text-emerald-300"}>{r.balance > 0 ? "+" : ""}{r.balance}</span>
            ) },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Equipment demand matrix</h3>
        <div className="mt-2">
          <SimpleTable rows={EQUIPMENT_DEMAND} columns={[
            { key: "equipment", label: "Equipment" },
            { key: "supply",    label: "Supply" },
            { key: "demand",    label: "Demand" },
            { key: "gap",       label: "Gap", render: r => (
              <span className={r.gap < 0 ? "text-rose-300" : "text-emerald-300"}>{r.gap > 0 ? "+" : ""}{r.gap}</span>
            ) },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Carrier gap recommendations</h3>
        <div className="mt-2">
          <SimpleTable rows={CARRIER_GAP_RECS} columns={[
            { key: "region",   label: "Region" },
            { key: "action",   label: "Action" },
            { key: "priority", label: "Priority", render: r => <StatusPill status={r.priority} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">National coverage alerts</h3>
        <div className="mt-2">
          <SimpleTable rows={NATIONAL_ALERTS} columns={[
            { key: "region",   label: "Region" },
            { key: "severity", label: "Severity", render: r => <StatusPill status={r.severity} /> },
            { key: "issue",    label: "Issue" },
            { key: "action",   label: "Recommended action" },
          ]} />
        </div>
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/[0.04] p-4 text-xs text-amber-200">
        Demand forecasting placeholder — no predictive guarantees claimed. Human review required before acting on recommendations.
      </Card>
    </V5Page>
  ),
});
