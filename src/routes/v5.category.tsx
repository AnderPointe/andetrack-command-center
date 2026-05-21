import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V5Page } from "@/components/v5/V5Page";
import { SimpleTable, StatusPill } from "@/components/v5/ui-bits";
import { Card } from "@/components/ui/card";
import { POSITIONING_AREAS, CATEGORY_PROOF_POINTS } from "@/v5/data/mockPhase23";

export const Route = createFileRoute("/v5/category")({
  head: () => ({ meta: [{ title: "Category Leadership · Anderoute V5" }] }),
  component: () => (
    <V5Page icon={<Crown className="size-6 text-fuchsia-300" />} title="Category Leadership Positioning"
      blurb="Differentiators, proof points, and category narrative. No analyst claims; analyst briefing remains a placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Positioning matrix</h3>
        <div className="mt-2">
          <SimpleTable rows={POSITIONING_AREAS} columns={[
            { key: "area",     label: "Area" },
            { key: "strength", label: "Strength", render: r => <StatusPill status={r.strength} /> },
            { key: "proof",    label: "Proof point" },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Category proof points</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {CATEGORY_PROOF_POINTS.map(p => (
            <div key={p.theme} className="rounded border border-white/10 bg-white/[0.02] p-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{p.theme}</div>
              <div className="mt-1 text-sm font-semibold text-fuchsia-200">{p.metric}</div>
              <div className="text-[11px] text-muted-foreground">{p.evidence}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4 text-xs text-muted-foreground">
        Category narrative: <strong>National-scale logistics OS with human-approved AI</strong>. Avoid claims of analyst recognition or guaranteed market share — those remain placeholder until verified externally.
      </Card>
    </V5Page>
  ),
});
