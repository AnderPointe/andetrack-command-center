import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA_QUALITY_ISSUES } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/data-quality")({
  head: () => ({ meta: [{ title: "Data Quality · Anderoute" }] }),
  component: Page,
});

function Page() {
  const total = DATA_QUALITY_ISSUES.reduce((a, d) => a + d.count, 0);
  return (
    <V1Page
      icon={<Database className="size-6 text-indigo-300" />}
      title="Data Quality & Cleanup"
      blurb={`${total} flagged records across ${DATA_QUALITY_ISSUES.length} categories. Clean before V1 cutover.`}
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {DATA_QUALITY_ISSUES.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <span>{d.issue}</span>
              <Badge variant="outline" className={d.count === 0 ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {d.count}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
