import { createFileRoute } from "@tanstack/react-router";
import { Swords } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { useCompetitiveDifferentiation, useCompetitiveWinRate } from "@/v55/hooks";

export const Route = createFileRoute("/v55/competitive")({
  head: () => ({ meta: [{ title: "Competitive · Anderoute V5.5" }] }),
  component: () => {
    const { competitors, winLoss } = useCompetitiveDifferentiation();
    const { stats } = useCompetitiveWinRate();
    return (
      <V55Page icon={<Swords className="size-6 text-amber-300" />} title="Competitive Differentiation Tracker"
        blurb="Competitor battlecards, feature gaps, win/loss analysis. Pricing notes are placeholders only.">
        <KpiGrid cols={4} items={[
          { label: "Win rate",          value: `${stats.win_pct}%` },
          { label: "vs Legacy TMS",     value: `${stats.vs_legacy_tms}%` },
          { label: "vs Load board",     value: `${stats.vs_load_board}%` },
          { label: "vs Telematics-only",value: `${stats.vs_telematics_only}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Competitor battlecards</h3>
          <div className="mt-2">
            <SimpleTable rows={competitors} columns={[
              { key: "name",    label: "Competitor" },
              { key: "segment", label: "Segment" },
              { key: "diff",    label: "Differentiation" },
              { key: "risk",    label: "Risk", render: (r) => <StatusPill status={r.risk} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Win / loss analysis</h3>
          <div className="mt-2">
            <SimpleTable rows={winLoss} columns={[
              { key: "acct",    label: "Account" },
              { key: "outcome", label: "Outcome", render: (r) => <StatusPill status={r.outcome} /> },
              { key: "reason",  label: "Reason" },
            ]} />
          </div>
        </Card>
      </V55Page>
    );
  },
});
