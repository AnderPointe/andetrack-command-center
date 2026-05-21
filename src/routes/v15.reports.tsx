import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REPORTS_V15 } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/reports")({
  head: () => ({ meta: [{ title: "V1.5 Reports · Anderoute" }] }),
  component: Page,
});

function Page() {
  const categories = Array.from(new Set(REPORTS_V15.map((r) => r.category)));
  return (
    <V15Page
      icon={<FileBarChart className="size-6 text-cyan-300" />}
      title="V1.5 Reports"
      blurb="Practical operational reports that paid customers actually ask for. CSV export via server function."
    >
      {categories.map((c) => (
        <Card key={c} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{c}</h2>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">
              {REPORTS_V15.filter((r) => r.category === c).length} reports
            </Badge>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {REPORTS_V15.filter((r) => r.category === c).map((r) => (
              <div key={r.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div>{r.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{r.sample}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V15Page>
  );
}
