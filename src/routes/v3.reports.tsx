import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { V3_REPORTS } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/reports")({
  head: () => ({ meta: [{ title: "V3 Reports · Anderoute" }] }),
  component: () => (
    <V3Page icon={<FileBarChart className="size-6 text-sky-300" />} title="V3 Reports"
      blurb="Phase 19 report catalog covering mobile, voice, telematics, marketplace, and certification readiness.">
      <div className="grid gap-2 md:grid-cols-3">
        {V3_REPORTS.map((r) => (
          <Card key={r.id} className="border-white/10 bg-white/[0.02] p-3 text-sm">
            <div className="font-medium">{r.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">Snapshot · CSV / PDF export placeholder</div>
          </Card>
        ))}
      </div>
    </V3Page>
  ),
});
