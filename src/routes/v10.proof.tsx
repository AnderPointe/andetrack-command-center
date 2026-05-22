import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Enterprise Proof Point Library";
const BLURB = "Categorized proof points with evidence links and approval workflow before sales use.";

function Page() {
  const p = H.useEnterpriseProofPoints();
  const categories = Array.from(new Set(p.points.map(x => x.category)));
  return (
    <V10Page icon={<BookOpen className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Approved"  value={p.summary.approved}  tone="emerald" />
        <ScoreCard label="In review" value={p.summary.in_review} tone="amber" />
        <ScoreCard label="Owner"     value={p.summary.owner}     tone="sky" />
      </div>
      {categories.map((cat) => (
        <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">{cat}</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {p.points.filter(x => x.category === cat).map(x => (
              <li key={x.id} className="flex items-center justify-between rounded border border-white/5 bg-black/20 px-3 py-1.5">
                <span>{x.title}</span>
                <StatusPill status={x.status} />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/proof")({
  head: () => ({ meta: [{ title: "Enterprise Proof Point Library · Anderoute V10" }] }),
  component: Page,
});
