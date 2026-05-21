import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ENTERPRISE_REPORTS, ENTERPRISE_REPORT_KPIS } from "@/v25/data/mockPhase18";

const kt: Record<string, string> = { good: "border-emerald-500/30 text-emerald-300", warn: "border-amber-500/30 text-amber-300", info: "border-sky-500/30 text-sky-300" };

export const Route = createFileRoute("/v25/reports")({
  head: () => ({ meta: [{ title: "Enterprise Reports · Anderoute" }] }),
  component: () => (
    <V25Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="Enterprise Reports Dashboard" blurb="14 reports across EDI, API, integration reliability, optimization impact, fleet/driver utilization, customer performance, multi-location, support, and billing.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Headline KPIs</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {ENTERPRISE_REPORT_KPIS.map((k) => (
            <div key={k.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{k.label}</span><Badge variant="outline" className={kt[k.tone]}>{k.delta}</Badge></div>
              <div className="mt-1 font-mono text-lg">{k.value}</div>
            </div>
          ))}
        </div>
      </Card>
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
