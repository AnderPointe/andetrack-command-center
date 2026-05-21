import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { KpiGrid, ScoreCard, SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { LIQUIDITY, LIQUIDITY_TREND, UNCOVERED_LOADS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/liquidity")({
  head: () => ({ meta: [{ title: "Marketplace Liquidity · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Store className="size-6 text-fuchsia-300" />} title="Marketplace Liquidity Command Center"
      blurb="Posted, awarded, uncovered loads with bid activity, time-to-award, and coverage gaps. Numbers are mock; no liquidity guarantees claimed.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Liquidity score" value={LIQUIDITY.score} tone="violet" />
        <KpiGrid cols={3} items={[
          { label: "Posted",   value: LIQUIDITY.posted.toLocaleString() },
          { label: "Awarded",  value: LIQUIDITY.awarded.toLocaleString() },
          { label: "Uncovered", value: LIQUIDITY.uncovered, sub: "Open coverage gap" },
        ]} />
      </div>
      <KpiGrid cols={5} items={[
        { label: "Avg bids/load",    value: LIQUIDITY.avg_bids_per_load },
        { label: "Time to 1st bid",  value: `${LIQUIDITY.time_to_first_bid_min}m` },
        { label: "Time to award",    value: `${LIQUIDITY.time_to_award_min}m` },
        { label: "Response rate",    value: `${LIQUIDITY.carrier_response_rate}%` },
        { label: "Accept rate",      value: `${LIQUIDITY.carrier_acceptance_rate}%` },
      ]} />
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Liquidity trend (4 weeks)</h3>
          <div className="mt-3 flex items-end gap-2 h-32">
            {LIQUIDITY_TREND.map(t => (
              <div key={t.week} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-emerald-400/60" style={{ height: `${t.score}%` }} />
                <div className="text-[10px] text-muted-foreground">{t.week}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Uncovered loads queue</h3>
          <div className="mt-2">
            <SimpleTable rows={UNCOVERED_LOADS} columns={[
              { key: "id",        label: "Load" },
              { key: "lane",      label: "Lane" },
              { key: "equipment", label: "Equip" },
              { key: "age_h",     label: "Age (h)" },
              { key: "urgency",   label: "Urgency", render: r => <StatusPill status={r.urgency} /> },
            ]} />
          </div>
        </Card>
      </div>
    </V5Page>
  ),
});
