import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid, SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { BOARD_KPIS, BOARD_RISKS, BOARD_DECISIONS, BOARD_TRENDS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/board")({
  head: () => ({ meta: [{ title: "Board Reporting · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Crown className="size-6 text-fuchsia-300" />} title="Executive & Board Reporting"
      blurb="Quarterly operating review builder: KPIs, strategic risks, decisions needed, and next-quarter priorities.">
      <KpiGrid cols={3} items={BOARD_KPIS} />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Strategic risks</h3>
          <div className="mt-2">
            <SimpleTable rows={BOARD_RISKS} columns={[
              { key: "area",     label: "Area" },
              { key: "risk",     label: "Risk" },
              { key: "severity", label: "Severity", render: r => <StatusPill status={r.severity} /> },
              { key: "owner",    label: "Owner" },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Decisions needed</h3>
          <div className="mt-2">
            <SimpleTable rows={BOARD_DECISIONS} columns={[
              { key: "topic",          label: "Topic" },
              { key: "recommendation", label: "Recommendation" },
              { key: "owner",          label: "Owner" },
            ]} />
          </div>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Board report builder packages KPIs, marketplace liquidity, revenue ops, customer success, certification completion, strategic partnerships, risks, and next-quarter priorities into a single export (mock).
      </Card>
    </V5Page>
  ),
});
