import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const c = H.useCapitalGradeCommercialReporting();
  const avg = Math.round(c.sections.reduce((s, r) => s + r.readiness, 0) / c.sections.length);
  const ready = c.sections.filter((s) => s.readiness >= 85).length;
  const lag = c.sections.filter((s) => s.readiness < 75).length;
  return (
    <V12Page icon={<FileBarChart className="size-6 text-cyan-300" />} title="Capital-Grade Commercial Reporting Center" blurb="Diligence-packet sections with section readiness. Not a claim of IPO, M&A, or audit readiness.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Sections"      value={String(c.sections.length)} tone="sky" />
        <ScoreCard label="Avg readiness" value={`${avg}%`}                  tone="emerald" />
        <ScoreCard label="≥ 85%"         value={String(ready)}              tone="violet" />
        <ScoreCard label="< 75%"         value={String(lag)}                tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={c.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "readiness", label: "Readiness", render: (r: any) => `${r.readiness}%` },
          { key: "owner", label: "Owner" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/capital")({
  head: () => ({ meta: [{ title: "Capital-Grade Reporting · V12" }] }),
  component: Page,
});
