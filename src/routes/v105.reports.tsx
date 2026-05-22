import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v105/hooks";

function Page() {
  const r = H.useReportsV105();
  return (
    <V105Page icon={<FileBarChart className="size-6 text-fuchsia-300" />} title="V10.5 Advanced Reporting" blurb="Mock report catalog covering commercialization, trust monetization, sales OS, deal desk, expansion, capital, board governance, risk.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Reports</h3>
        <ul className="mt-2 grid gap-1 text-sm md:grid-cols-2">
          {r.reports.map(name => (
            <li key={name} className="rounded border border-white/10 bg-black/20 px-3 py-1.5">{name}</li>
          ))}
        </ul>
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/reports")({
  head: () => ({ meta: [{ title: "V10.5 Reports · Phase 34" }] }),
  component: Page,
});
