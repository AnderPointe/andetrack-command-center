import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V35_REPORTS } from "@/v35/data/mockPhase20";

export const Route = createFileRoute("/v35/reports")({
  head: () => ({ meta: [{ title: "V3.5 Reports · Anderoute" }] }),
  component: () => (
    <V35Page icon={<FileBarChart className="size-6 text-amber-300" />} title="V3.5 Advanced Reporting"
      blurb="Commercial, telematics, compliance, certification, and multi-region reporting surfaces.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="grid gap-2 md:grid-cols-2">{V35_REPORTS.map((r) => (
          <div key={r} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-3 py-2 text-sm">
            <span>{r}</span>
            <Badge variant="outline" className="border-amber-500/40 text-amber-300">scheduled</Badge>
          </div>
        ))}</div>
      </Card>
    </V35Page>
  ),
});
