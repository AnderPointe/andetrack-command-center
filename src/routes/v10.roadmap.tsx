import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Long-Term Category Leadership Roadmap";
const BLURB = "6 horizons × 11 tracks — product, marketplace, AI, trust, customer/driver experience, partner, financial, certification, global, narrative.";

function Page() {
  const r = H.useCategoryLeadershipRoadmap();
  return (
    <V10Page icon={<Map className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid grid-cols-[12rem_repeat(6,minmax(0,1fr))] gap-2 text-xs">
          <div className="font-semibold text-amber-200">Track</div>
          {r.horizons.map(h => <div key={h} className="font-semibold text-amber-200">{h}</div>)}
          {r.tracks.map(t => (
            <>
              <div key={t.track + "-h"} className="text-sm font-medium">{t.track}</div>
              {t.items.map((it, i) => (
                <div key={t.track + i} className="rounded border border-white/5 bg-black/20 px-2 py-1 text-[11px] text-muted-foreground">{it}</div>
              ))}
            </>
          ))}
        </div>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/roadmap")({
  head: () => ({ meta: [{ title: "Long-Term Category Leadership Roadmap · Anderoute V10" }] }),
  component: Page,
});
