import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const pl = H.useProductLineOperatingExcellence();
  const avg = Math.round(pl.reduce((s,x)=>s+x.score,0)/pl.length);
  return (
    <V145Page icon={<Boxes className="size-6 text-fuchsia-300" />} title="Product-Line Operating Excellence" blurb="Adoption, retention impact, reliability, debt, competitive strength, capital contribution per product line.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Product lines" value={pl.length} tone="violet" />
        <ScoreCard label="Avg OpEx score" value={avg} tone="emerald" />
        <ScoreCard label="Expand/scale" value={pl.filter(x => x.invest === "expand" || x.invest === "scale").length} tone="amber" />
      </div>
      <Section title="ProductOperatingHealthMatrix">
        <SimpleTable rows={pl as any} columns={[
          { key: "line", label: "Product" }, { key: "score", label: "OpEx" },
          { key: "adoption", label: "Adopt %" }, { key: "retention", label: "Retention" },
          { key: "reliability", label: "Reliab %" }, { key: "debt", label: "Debt" },
          { key: "invest", label: "Invest" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/product-lines")({ head: () => ({ meta: [{ title: "Product-Line OpEx · V14.5" }] }), component: Page });
