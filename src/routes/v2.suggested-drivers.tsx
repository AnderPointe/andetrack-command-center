import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OPT_LOAD, OPT_CANDIDATES, confidenceBand } from "@/v2/data/mockPhase17";

export const Route = createFileRoute("/v2/suggested-drivers")({
  head: () => ({ meta: [{ title: "Suggested Drivers · Anderoute" }] }),
  component: Page,
});

const toneClass: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  info: "border-sky-500/30 text-sky-300",
  warn: "border-amber-500/30 text-amber-300",
  bad:  "border-rose-500/30 text-rose-300",
};

function Page() {
  return (
    <V2Page
      icon={<Users className="size-6 text-violet-300" />}
      title="Suggested Driver Assignment"
      blurb={`Recommendations for ${OPT_LOAD.id} (${OPT_LOAD.vehicleType}, ${OPT_LOAD.pickup} → ${OPT_LOAD.dropoff}). Offer and assignment require an explicit dispatcher action — never auto-assigned.`}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {OPT_CANDIDATES.slice().sort((a, b) => b.score - a.score).map((c) => {
          const conf = confidenceBand(c.score);
          return (
            <Card key={c.driverId} className="border-white/10 bg-white/[0.02] p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.driver}</div>
                  <div className="text-xs text-muted-foreground">{c.driverId} · {c.vehicleType}</div>
                </div>
                <Badge variant="outline" className={toneClass[conf.tone]}>{conf.label} confidence</Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{conf.note}</div>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <div><span className="text-muted-foreground">Status:</span> {c.status.replace("_", " ")}</div>
                <div><span className="text-muted-foreground">Distance:</span> {c.distanceMi} mi</div>
                <div><span className="text-muted-foreground">ETA to pickup:</span> {c.etaMin}m</div>
                <div><span className="text-muted-foreground">Vehicle match:</span> {c.vehicleMatch}</div>
                <div><span className="text-muted-foreground">CDL match:</span> {c.cdlMatch}</div>
                <div><span className="text-muted-foreground">Availability:</span> {c.availability}</div>
                <div><span className="text-muted-foreground">On-time:</span> {c.onTime}</div>
                <div><span className="text-muted-foreground">GPS fresh:</span> {c.gpsFresh ? "yes" : "no"}</div>
              </div>
              <div className="mt-2 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-xs text-muted-foreground">
                {c.explanation}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="text-xs text-muted-foreground">Match score</div>
                <div className="text-base font-semibold">{c.score}</div>
              </div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">Offer load</Button>
                <Button size="sm" className="h-8 bg-violet-600 text-xs hover:bg-violet-500">Request assignment (needs approval)</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </V2Page>
  );
}
