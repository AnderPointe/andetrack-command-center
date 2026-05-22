import { createFileRoute } from "@tanstack/react-router";
import { Swords } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Competitive Category Positioning";
const BLURB = "Competitor comparison, battlecards, win/loss notes, differentiation strategy.";

function Page() {
  const c = H.useCompetitiveCategoryPositioning();
  return (
    <V10Page icon={<Swords className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Competitor comparison</h3>
        <SimpleTable rows={c.competitors as any} columns={[
          { key: "competitor", label: "Competitor" },
          { key: "position", label: "Position" },
          { key: "feature", label: "Feature" }, { key: "mp", label: "MP" },
          { key: "ai", label: "AI" }, { key: "driver", label: "Driver" },
          { key: "portal", label: "Portal" }, { key: "integration", label: "Integration" },
          { key: "gov", label: "Gov" }, { key: "security", label: "Security" },
        ]} />
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Battlecards</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {c.battlecards.map(b => (
              <li key={b.vs} className="rounded border border-white/10 bg-black/20 px-3 py-2">
                <div className="font-medium text-amber-200">vs {b.vs}</div>
                <div className="text-xs text-emerald-300">Win: {b.win}</div>
                <div className="text-xs text-rose-300">Risk: {b.risk}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Win / loss</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {c.winLoss.map((w, i) => (
              <li key={i} className="rounded border border-white/5 bg-black/20 px-3 py-1.5">
                <StatusPill status={w.outcome} /> <span className="ml-2">{w.notes}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/competitive")({
  head: () => ({ meta: [{ title: "Competitive Category Positioning · Anderoute V10" }] }),
  component: Page,
});
