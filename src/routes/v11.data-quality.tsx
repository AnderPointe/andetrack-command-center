import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_QUALITY_ISSUES } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/data-quality")({
  head: () => ({ meta: [{ title: "V1.1 Data Quality · Anderoute" }] }),
  component: Page,
});

const sevTone: Record<string, string> = {
  high:   "border-rose-500/30 text-rose-300",
  medium: "border-amber-500/30 text-amber-300",
  low:    "border-sky-500/30 text-sky-300",
};

function Page() {
  const total = DATA_QUALITY_ISSUES.reduce((s, i) => s + i.count, 0);
  const high = DATA_QUALITY_ISSUES.filter((i) => i.severity === "high").reduce((s, i) => s + i.count, 0);
  return (
    <V11Page
      icon={<Database className="size-6 text-fuchsia-300" />}
      title="Data Quality V1.1"
      blurb="Detect bad data fast: missing customers, stale GPS, completed loads without POD, CSV duplicates. Cleanup wizard fixes in-place."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Total issues" value={total} tone={total > 20 ? "warn" : "good"} />
        <StatTile label="High severity" value={high} tone={high ? "bad" : "good"} />
        <StatTile label="Categories" value={DATA_QUALITY_ISSUES.length} tone="info" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Detected issues</h2>
        <div className="mt-3 space-y-2 text-sm">
          {DATA_QUALITY_ISSUES.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span className="font-mono text-xs">{i.kind}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{i.count}</Badge>
                <Badge variant="outline" className={sevTone[i.severity]}>{i.severity}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
