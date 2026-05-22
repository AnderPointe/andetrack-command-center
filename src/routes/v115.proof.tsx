import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const p = H.useCustomerProofInfluence();
  return (
    <V115Page icon={<BookOpen className="size-6 text-emerald-300" />} title="Customer Proof Revenue Influence" blurb="Which proofs are used in deals and how much ARR they influence. Mock-only.">
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
