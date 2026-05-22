import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V10Page } from "@/components/v10/V10Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill, ExecBanner, OverlayStrip } from "@/components/v10/ui-bits";
import * as H from "@/v10/hooks";

const TITLE = "Product-Line Durability and Monetization";
const BLURB = "12 product lines with adoption, revenue, debt, competitive strength, monetization maturity, and investment recommendation.";

function Page() {
  const p = H.useProductLineDurabilityMonetization();
  return (
    <V10Page icon={<Boxes className="size-6 text-amber-300" />} title={TITLE} blurb={BLURB}>
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Monetization" value={p.summary.monetization} tone="emerald" />
        <ScoreCard label="Durability"   value={p.summary.durability} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Product line matrix</h3>
        <SimpleTable rows={p.lines as any} columns={[
          { key: "line", label: "Line" },
          { key: "adoption", label: "Adoption", render: (r: any) => `${r.adoption}%` },
          { key: "revenue_pct", label: "Rev %", render: (r: any) => `${r.revenue_pct}%` },
          { key: "debt", label: "Debt", render: (r: any) => <StatusPill status={r.debt} /> },
          { key: "competitive", label: "Competitive" },
          { key: "monetization", label: "Monetization" },
          { key: "invest", label: "Invest" },
        ]} />
      </Card>
    </V10Page>
  );
}

export const Route = createFileRoute("/v10/product")({
  head: () => ({ meta: [{ title: "Product-Line Durability and Monetization · Anderoute V10" }] }),
  component: Page,
});
