import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { Card } from "@/components/ui/card";
import { useReportsV6 } from "@/v6/hooks";

export const Route = createFileRoute("/v6/reports")({
  head: () => ({ meta: [{ title: "V6 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV6();
    return (
      <V6Page icon={<FileBarChart className="size-6 text-emerald-300" />} title="V6 Advanced Reporting"
        blurb="Generated via Edge Functions and exported to investor/board/executive packets. All financial and compliance figures are placeholders unless backed by audit evidence.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <ul className="grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
            {reports.map(r => <li key={r}>· {r} report</li>)}
          </ul>
        </Card>
      </V6Page>
    );
  },
});
