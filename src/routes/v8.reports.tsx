import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useReportsV8 } from "@/v8/hooks";

export const Route = createFileRoute("/v8/reports")({
  head: () => ({ meta: [{ title: "V8 Reports · Anderoute" }] }),
  component: () => {
    const { reports } = useReportsV8();
    return (
      <V8Page icon={<FileBarChart className="size-6 text-violet-300" />} title="V8 Reports"
        blurb="20 V8 reports across scale, country, marketplace, financial, compliance, customer, support, partner, governance, board, risk, adoption, expansion, and operating model.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={reports as any} columns={[
            { key: "name", label: "Report" },
            { key: "owner", label: "Owner" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
