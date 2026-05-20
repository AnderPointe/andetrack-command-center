import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DISPATCH_FEATURES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/dispatcher")({
  head: () => ({ meta: [{ title: "V1.1 Dispatcher · Anderoute" }] }),
  component: Page,
});

function Page() {
  const done = DISPATCH_FEATURES.filter((d) => d.done).length;
  const pct = Math.round((done / DISPATCH_FEATURES.length) * 100);
  return (
    <V11Page
      icon={<ClipboardCheck className="size-6 text-fuchsia-300" />}
      title="Dispatcher V1.1"
      blurb="Sharper load board: advanced filters, availability, vehicle type, risk-based delivery filtering, and an activity timeline."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Features done" value={`${done}/${DISPATCH_FEATURES.length}`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Completion" value={`${pct}%`} tone={pct >= 80 ? "good" : "warn"} />
        <StatTile label="Open" value={DISPATCH_FEATURES.length - done} tone={done < DISPATCH_FEATURES.length ? "warn" : "good"} />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Improvements</h2>
        <div className="mt-3 space-y-2 text-sm">
          {DISPATCH_FEATURES.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span>{d.label}</span>
              <Badge variant="outline" className={d.done ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {d.done ? "Done" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
