import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useReportsV12();
  return (
    <V12Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="V12 Advanced Reporting" blurb="20 reports spanning commercial command, revenue quality, account governance, deal execution, risk, governance, and board reporting.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ul className="grid gap-1.5 text-sm md:grid-cols-2">
          {rows.map((r) => <li key={r} className="rounded border border-white/5 bg-black/20 px-3 py-1.5">{r}</li>)}
        </ul>
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/reports")({
  head: () => ({ meta: [{ title: "V12 Reports · Phase 37" }] }),
  component: Page,
});
