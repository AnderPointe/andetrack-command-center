import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { METRIC_GROUPS } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/metrics")({
  head: () => ({ meta: [{ title: "Pilot Metrics · Anderoute" }] }),
  component: Page,
});

function Page() {
  return (
    <V1Page
      icon={<BarChart3 className="size-6 text-indigo-300" />}
      title="Pilot Metrics Dashboard"
      blurb="Adoption, operations, reliability, and customer-value signals from the first live pilot."
    >
      {METRIC_GROUPS.map((g) => (
        <Card key={g.id} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{g.title}</h2>
          <p className="text-xs text-muted-foreground">{g.blurb}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {g.metrics.map((m) => (
              <div key={m.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-lg font-semibold">{m.value}</div>
                {m.hint && <div className="mt-1 text-xs text-muted-foreground">{m.hint}</div>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V1Page>
  );
}
