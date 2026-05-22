import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.useCustomerProofInfluence();
  const totalDeals = p.rows.reduce((sum, row) => sum + row.used_in_deals, 0);
  const totalArr = p.rows.reduce((sum, row) => sum + row.influenced_arr, 0);
  return (
    <V115Page icon={<BookOpen className="size-6 text-emerald-300" />} title="Customer Proof Revenue Influence" blurb="Which proofs are used in deals and how much ARR they influence. Mock-only.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Proof assets" value={p.rows.length} tone="emerald" />
        <ScoreCard label="Deals influenced" value={totalDeals} tone="sky" />
        <ScoreCard label="Influenced ARR" value={`$${(totalArr / 1_000_000).toFixed(1)}M`} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={p.rows as any} columns={[
          { key: "proof",          label: "Proof asset" },
          { key: "used_in_deals",  label: "Used in deals" },
          { key: "influenced_arr", label: "Influenced ARR", render: (r: any) => `$${(r.influenced_arr/1000).toFixed(0)}k` },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/proof")({
  head: () => ({ meta: [{ title: "Proof Influence · V11.5" }] }),
  component: Page,
});
