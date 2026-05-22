import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v125/hooks";

function Page() {
  const rows = H.useReportsV125();
  return (
    <V125Page icon={<FileBarChart className="size-6 text-teal-300" />} title="V12.5 Advanced Reporting" blurb="19 reports across growth operations, auditability, revenue intelligence, evidence, partner, marketplace, board, governance.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <ul className="grid gap-1.5 text-sm md:grid-cols-2">
          {rows.map((r) => <li key={r} className="rounded border border-white/5 bg-black/20 px-3 py-1.5">{r}</li>)}
        </ul>
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/reports")({
  head: () => ({ meta: [{ title: "V12.5 Reports · Phase 38" }] }),
  component: Page,
});
