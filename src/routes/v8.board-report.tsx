import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useBoardGlobalStrategyReporting } from "@/v8/hooks";

export const Route = createFileRoute("/v8/board-report")({
  head: () => ({ meta: [{ title: "Board Global Strategy Report · Anderoute" }] }),
  component: () => {
    const { sections } = useBoardGlobalStrategyReporting();
    return (
      <V8Page icon={<FileBarChart className="size-6 text-violet-300" />} title="Board-Level Global Strategy Report"
        blurb="Global expansion, country readiness, marketplace, financial controls, compliance, customer success, support, partners, risks, decisions, and next-quarter priorities.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={sections as any} columns={[
            { key: "section",   label: "Section" },
            { key: "highlight", label: "Highlight" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
