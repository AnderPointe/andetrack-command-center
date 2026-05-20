import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_QUALITY_ISSUES } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/data-quality")({
  head: () => ({ meta: [{ title: "Data Quality · Anderoute" }] }),
  component: Page,
});

function Page() {
  const total = DATA_QUALITY_ISSUES.reduce((a, d) => a + d.count, 0);
  const dirtyCategories = DATA_QUALITY_ISSUES.filter((d) => d.count > 0).length;
  const cleanCategories = DATA_QUALITY_ISSUES.length - dirtyCategories;
  return (
    <V1Page
      icon={<Database className="size-6 text-indigo-300" />}
      title="Data Quality & Cleanup"
      blurb="Flagged records that block clean migrations and accurate reports. Clean before V1 cutover."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Flagged records" value={total} tone={total === 0 ? "good" : total < 20 ? "warn" : "bad"} />
        <StatTile label="Categories with issues" value={dirtyCategories} tone={dirtyCategories ? "warn" : "good"} />
        <StatTile label="Clean categories" value={cleanCategories} tone="good" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">All checks</h2>
        <div className="mt-3 space-y-2">
          {DATA_QUALITY_ISSUES
            .slice()
            .sort((a, b) => b.count - a.count)
            .map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
                <span>{d.issue}</span>
                <Badge variant="outline" className={d.count === 0 ? "border-emerald-500/30 text-emerald-300" : d.count < 5 ? "border-amber-500/30 text-amber-300" : "border-rose-500/30 text-rose-300"}>
                  {d.count}
                </Badge>
              </div>
            ))}
        </div>
      </Card>
    </V1Page>
  );
}
