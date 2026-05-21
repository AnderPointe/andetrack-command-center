import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { Card } from "@/components/ui/card";
import { useReportsV7 } from "@/v7/hooks";

export const Route = createFileRoute("/v7/reports")({
  head: () => ({ meta: [{ title: "V7 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV7();
    return (
      <V7Page icon={<FileBarChart className="size-6 text-indigo-300" />} title="V7 Advanced Reporting"
        blurb="19 V7 reports — global network, readiness, country, residency, cross-border, regulated controls, compliance, AI gov, marketplace, trust+safety, financial maturity, audit readiness, revenue ops, partner ecosystem, intl marketplace, enterprise customers, support, risk, roadmap.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <ul className="grid gap-1.5 text-xs text-muted-foreground md:grid-cols-2">
            {reports.map(r => (
              <li key={r} className="rounded-md border border-white/5 bg-white/[0.02] px-3 py-2 hover:border-indigo-400/30">
                {r}
              </li>
            ))}
          </ul>
        </Card>
      </V7Page>
    );
  },
});
