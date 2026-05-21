import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ENTERPRISE_REPORTS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/reports")({
  head: () => ({ meta: [{ title: "Enterprise Reports · Anderoute" }] }),
  component: () => (
    <V25Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Enterprise Reports Dashboard" blurb="14 reports across EDI, API, integration reliability, optimization impact, fleet/driver utilization, customer performance, multi-location, support, and billing.">
      <div className="grid gap-2 md:grid-cols-2">
        {ENTERPRISE_REPORTS.map((r) => (
          <Card key={r.id} className="border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between"><div className="text-sm font-medium">{r.name}</div><Badge variant="outline" className="border-sky-500/30 text-sky-300">{r.category}</Badge></div>
            <div className="mt-1 text-xs text-muted-foreground">Owner: {r.owner}</div>
          </Card>
        ))}
      </div>
    </V25Page>
  ),
});
