import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { V1_REPORTS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/reports")({
  head: () => ({ meta: [{ title: "V1 Reports · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<FileBarChart className="size-6 text-indigo-300" />}
      title="V1 Reports"
      blurb="Practical operational reports shipping with V1. Heavier analytics defer to V1.1+."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 md:grid-cols-2">
          {V1_REPORTS.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.description}</div>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
