import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V65Page } from "@/components/v65/V65Page";
import { Card } from "@/components/ui/card";
import { useReportsV65 } from "@/v65/hooks";

export const Route = createFileRoute("/v65/reports")({
  head: () => ({ meta: [{ title: "V6.5 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV65();
    return (
      <V65Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="V6.5 Advanced Reporting"
        blurb="Generated via internal server functions and exported to executive / board / audit packets. Financial and compliance figures are placeholders unless backed by audit evidence.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <ul className="grid gap-1 text-xs text-muted-foreground md:grid-cols-2">
            {reports.map(r => <li key={r}>· {r} report</li>)}
          </ul>
        </Card>
      </V65Page>
    );
  },
});
