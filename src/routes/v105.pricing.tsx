import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const p = H.usePricingPackagingGovernance();
  return (
    <V105Page icon={<Tag className="size-6 text-fuchsia-300" />} title="Pricing and Packaging Governance" blurb="Package adoption, attach, revenue mix, support burden, margin, packaging recommendations.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Package catalog</h3>
        <SimpleTable rows={p.packages as any} columns={[
          { key: "pkg", label: "Package" },
          { key: "adoption", label: "Adoption %", render: (r: any) => `${r.adoption}%` },
          { key: "rev_pct", label: "Rev %", render: (r: any) => `${r.rev_pct}%` },
          { key: "attach", label: "Attach %", render: (r: any) => `${r.attach}%` },
          { key: "support", label: "Support", render: (r: any) => <StatusPill status={r.support} /> },
          { key: "margin",  label: "Margin",  render: (r: any) => <StatusPill status={r.margin} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/pricing")({
  head: () => ({ meta: [{ title: "Pricing & Packaging · V10.5" }] }),
  component: Page,
});
