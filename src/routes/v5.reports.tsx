import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { Card } from "@/components/ui/card";
import { V5_REPORTS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/reports")({
  head: () => ({ meta: [{ title: "V5 Reports · Anderoute" }] }),
  component: () => (
    <V5Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="V5 Reports"
      blurb="Scheduled and on-demand V5 reports across maturity, marketplace, carrier, certification, board, revenue, success, support, governance, growth, partner, national ops, and data room.">
      <div className="grid gap-3 md:grid-cols-3">
        {V5_REPORTS.map(r => (
          <Card key={r} className="border-white/10 bg-white/[0.02] p-3 text-sm">{r}</Card>
        ))}
      </div>
    </V5Page>
  ),
});
