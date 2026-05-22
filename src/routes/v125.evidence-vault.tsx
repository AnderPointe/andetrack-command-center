import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const v = H.useGrowthOperatingEvidence();
  const approved = v.filter((r) => r.approval === "approved").length;
  const review = v.filter((r) => r.approval === "review").length;
  const boardUse = v.filter((r) => r.board_use).length;
  return (
    <V125Page icon={<BookOpen className="size-6 text-teal-300" />} title="Growth Operating Evidence Vault" blurb="Evidence items mapped to customer, opportunity, partner, product-line, with approval and board/data-room usage flags.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Items"     value={v.length} tone="sky" />
        <ScoreCard label="Approved"  value={approved} tone="emerald" />
        <ScoreCard label="Review"    value={review}   tone="amber" />
        <ScoreCard label="Board use" value={boardUse} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={v as any} columns={[
          { key: "id", label: "ID" }, { key: "category", label: "Category" }, { key: "owner", label: "Owner" }, { key: "source", label: "Source" }, { key: "customer", label: "Customer" }, { key: "approval", label: "Approval", render: (r: any) => <StatusPill status={r.approval === "approved" ? "ready" : r.approval === "review" ? "review" : "placeholder"} /> }, { key: "board_use", label: "Board", render: (r: any) => r.board_use ? "✓" : "—" }, { key: "data_room", label: "Data Room", render: (r: any) => r.data_room ? "✓" : "—" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/evidence-vault")({
  head: () => ({ meta: [{ title: "Evidence Vault · V12.5" }] }),
  component: Page,
});
