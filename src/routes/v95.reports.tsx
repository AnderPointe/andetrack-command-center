import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v95/hooks";

function Page() {
  const r = H.useReportsV95();
  return (
    <V95Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="V9.5 Reports" blurb="Enterprise stewardship, trust, evidence, financial gov, marketplace, customer trust, category leadership, board, value, control, risk, AI, support, data, durability, partner, retention, procurement, continuity.">
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {r.reports.map((name) => (
          <Card key={name} className="border-white/10 bg-white/[0.02] p-3 text-sm">
            <div className="font-medium">{name}</div>
            <div className="mt-1 text-xs text-muted-foreground">CSV / PDF export placeholder · permissioned by role.</div>
          </Card>
        ))}
      </div>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/reports")({
  head: () => ({ meta: [{ title: "V9.5 Reports · Anderoute" }] }),
  component: Page,
});
