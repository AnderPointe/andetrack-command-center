import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialProofGovernance();
  const approved = rows.filter((r) => r.status === "approved").length;
  const stale = rows.filter((r) => r.freshness_d > 60).length;
  const uses = rows.reduce((s, r) => s + r.deal_uses, 0);
  return (
    <V12Page icon={<BookOpen className="size-6 text-cyan-300" />} title="Commercial Proof Governance" blurb="Proof approval status, freshness, and deal usage. Revenue influence remains a placeholder attribution.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Proof assets" value={String(rows.length)} tone="sky" />
        <ScoreCard label="Approved"     value={String(approved)}    tone="emerald" />
        <ScoreCard label="Stale (>60d)" value={String(stale)}       tone="amber" />
        <ScoreCard label="Deal uses"    value={String(uses)}        tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "proof", label: "Proof" }, { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "freshness_d", label: "Fresh (d)" },
          { key: "deal_uses", label: "Deal uses" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/proof")({
  head: () => ({ meta: [{ title: "Proof Governance · V12" }] }),
  component: Page,
});
