import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useCommercialProofGovernance();
  return (
    <V12Page icon={<BookOpen className="size-6 text-cyan-300" />} title="Commercial Proof Governance" blurb="Proof approval status, freshness, and deal usage. Revenue influence remains a placeholder attribution.">
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
