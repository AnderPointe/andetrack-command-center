import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useRoadmapInvestmentGovernance } from "@/v6/hooks";

export const Route = createFileRoute("/v6/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap Governance · V6" }] }),
  component: () => {
    const { horizons, items, approvals } = useRoadmapInvestmentGovernance();
    return (
      <V6Page icon={<Map className="size-6 text-emerald-300" />} title="Long-Term Roadmap Investment Governance"
        blurb="Investment items across horizons (current Q → 36mo placeholder) and categories (dispatch, mobile, EliteNav, CoPilot, marketplace, API, EDI, portal, telematics, governance, security, revenue, partner, infra).">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Horizons</h3>
          <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
            {horizons.map(h => <span key={h} className="rounded-full border border-white/10 px-2 py-0.5 text-muted-foreground">{h}</span>)}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={items} columns={[
            { key: "cat",     label: "Category" },
            { key: "horizon", label: "Horizon" },
            { key: "invest",  label: "Invest ($M, pl)" },
            { key: "value",   label: "Value", render: (r) => <StatusPill status={r.value} /> },
            { key: "status",  label: "Status", render: (r) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Board approval queue</h3>
          <div className="mt-2">
            <SimpleTable rows={approvals} columns={[
              { key: "item",   label: "Item" },
              { key: "board",  label: "Board" },
              { key: "status", label: "Status", render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
