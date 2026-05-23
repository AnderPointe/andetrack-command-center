import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const p = H.useProductLinePerformanceGovernance();
  return (
    <V15Page icon={<Boxes className="size-6 text-cyan-300" />} title="Product-Line Performance Governance" blurb="12 product lines · adoption, retention, expansion, support burden, reliability, debt, competitive strength, category contribution, capital value, investment status, risk.">
      <ScoreCard label="Product-line performance" value={p.score} tone="violet" />
      <Section title="Product lines">
        <SimpleTable rows={p.lines as any} columns={[
          { key: "line", label: "Line" }, { key: "adopt", label: "Adopt" }, { key: "rev_contrib", label: "Rev" },
          { key: "ret", label: "Ret" }, { key: "exp", label: "Exp" }, { key: "support", label: "Sup" },
          { key: "rel", label: "Rel" }, { key: "debt", label: "Debt" }, { key: "compet", label: "Compet" },
          { key: "category", label: "Cat" }, { key: "capital", label: "Cap" },
          { key: "invest", label: "Invest", render: (r: any) => <StatusPill status={r.invest} /> },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/product-lines")({
  head: () => ({ meta: [{ title: "Product Performance · V15" }] }),
  component: Page,
});
