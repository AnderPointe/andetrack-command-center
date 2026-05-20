import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { REPORTS_V11 } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/reports")({
  head: () => ({ meta: [{ title: "V1.1 Reports · Anderoute" }] }),
  component: Page,
});

function Page() {
  const categories = Array.from(new Set(REPORTS_V11.map((r) => r.category)));
  return (
    <V11Page
      icon={<FileBarChart className="size-6 text-fuchsia-300" />}
      title="V1.1 Reports"
      blurb="Ten practical reports covering operations, drivers, telemetry, customers, and internal activity. CSV download via Edge Function."
    >
      {categories.map((c) => (
        <Card key={c} className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{c}</h2>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">
              {REPORTS_V11.filter((r) => r.category === c).length} reports
            </Badge>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {REPORTS_V11.filter((r) => r.category === c).map((r) => (
              <div key={r.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div>{r.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{r.sample}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V11Page>
  );
}
