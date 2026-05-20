import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_QUALITY_ISSUES, DATA_QUALITY_RECIPES } from "@/v11/data/mockPhase15";

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
  const sorted = [...DATA_QUALITY_ISSUES].sort((a, b) => {
    const w = { high: 3, medium: 2, low: 1 } as const;
    return w[b.severity as keyof typeof w] - w[a.severity as keyof typeof w] || b.count - a.count;
  });
  return (
    <V11Page
      icon={<Database className="size-6 text-fuchsia-300" />}
      title="Data Quality V1.1"
      blurb="Detect bad data fast: missing customers, stale GPS, completed loads without POD, CSV duplicates. Each issue ships with a one-click cleanup recipe."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Total issues" value={total} tone={total > 20 ? "warn" : "good"} />
        <StatTile label="High severity" value={high} tone={high ? "bad" : "good"} />
        <StatTile label="Categories" value={DATA_QUALITY_ISSUES.length} tone="info" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Issues + cleanup recipes</h2>
        <div className="mt-3 space-y-2 text-sm">
          {sorted.map((i) => (
            <div key={i.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs">{i.kind}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">{i.count}</Badge>
                  <Badge variant="outline" className={sevTone[i.severity]}>{i.severity}</Badge>
                </div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Recipe: {DATA_QUALITY_RECIPES[i.kind] ?? "Investigate manually."}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
