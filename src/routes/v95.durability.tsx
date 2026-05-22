import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const d = H.useProductDurability();
  return (
    <V95Page icon={<Boxes className="size-6 text-cyan-300" />} title="Product Durability Dashboard" blurb="Per product-line maturity, adoption, revenue contribution, tech-debt placeholder, roadmap health, owner accountability.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Product durability" value={d.summary.score} tone="emerald" />
        <ScoreCard label="Product lines"      value={d.lines.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Product lines</h3>
        <div className="mt-2">
          <SimpleTable rows={d.lines as any} columns={[
            { key: "line", label: "Line" },
            { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
            { key: "adoption", label: "Adoption", render: (r: any) => `${r.adoption}%` },
            { key: "revenue", label: "Revenue %", render: (r: any) => `${r.revenue}%` },
            { key: "debt", label: "Tech debt", render: (r: any) => <StatusPill status={r.debt} /> },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/durability")({
  head: () => ({ meta: [{ title: "Product Durability · Anderoute V9.5" }] }),
  component: Page,
});
