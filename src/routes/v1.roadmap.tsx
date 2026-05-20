import { createFileRoute } from "@tanstack/react-router";
import { Map as MapIcon } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROADMAP, type RoadmapItem } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/roadmap")({
  head: () => ({ meta: [{ title: "Post-Pilot Roadmap · Anderoute" }] }),
  component: Page,
});

const ORDER: RoadmapItem["release"][] = ["V1", "V1.1", "V1.5", "V2", "Enterprise"];
const TONE: Record<string, string> = {
  shipped:     "border-emerald-500/30 text-emerald-300",
  in_progress: "border-indigo-500/30 text-indigo-300",
  planned:     "border-sky-500/30 text-sky-300",
  deferred:    "border-white/15 text-muted-foreground",
};

function Page() {
  return (
    <V1Page
      icon={<MapIcon className="size-6 text-indigo-300" />}
      title="Updated Product Roadmap"
      blurb="V1 ships now. V1.1, V1.5, V2, and Enterprise outline the sequenced bets that follow."
    >
      {ORDER.map((rel) => {
        const items = ROADMAP.filter((r) => r.release === rel);
        return (
          <Card key={rel} className="border-white/10 bg-white/[0.02] p-4">
            <h2 className="text-sm font-semibold">{rel}</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                  <span>{i.title}</span>
                  <Badge variant="outline" className={TONE[i.status]}>{i.status.replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </V1Page>
  );
}
