import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Board and Investor Narrative Center";
const BLURB = "Generate the board/investor narrative across 15 sections with proof points.";

function Page() {
  const n = H.useBoardInvestorNarrative();
  return (
    <V10Page icon={<FileBarChart className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Narrative readiness" value={n.summary.readiness} tone="emerald" />
        <ScoreCard label="Sections"            value={n.sections.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Narrative sections</h3>
        <SimpleTable rows={n.sections as any} columns={[
          { key: "section", label: "Section" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/5 p-4">
        <h3 className="text-sm font-semibold text-amber-200">Proof points attached</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {n.proof.map((p, i) => <li key={i} className="rounded border border-white/10 bg-black/20 px-3 py-1.5">{p}</li>)}
        </ul>
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/narrative")({
  head: () => ({ meta: [{ title: "Board and Investor Narrative Center · Anderoute V10" }] }),
  component: Page,
});
