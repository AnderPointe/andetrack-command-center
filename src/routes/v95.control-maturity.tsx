import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const c = H.useEnterpriseControlMaturity();
  return (
    <V95Page icon={<ClipboardCheck className="size-6 text-cyan-300" />} title="Global Enterprise Control Maturity" blurb="Access, financial, marketplace, compliance, data, AI, API/EDI, mobile, support, partner, country launch, customer portal control maturity + testing calendar.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Control maturity"  value={c.summary.score} tone="emerald" />
        <ScoreCard label="Open exceptions"   value={c.summary.exceptions} tone="rose" />
        <ScoreCard label="Owners assigned"   value={c.summary.owners_assigned} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Control domains</h3>
        <div className="mt-2">
          <SimpleTable rows={c.domains as any} columns={[
            { key: "domain", label: "Domain" },
            { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Testing calendar</h3>
        <div className="mt-2">
          <SimpleTable rows={c.calendar as any} columns={[
            { key: "domain", label: "Domain" },
            { key: "next_test", label: "Next test" },
            { key: "owner", label: "Owner" },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/control-maturity")({
  head: () => ({ meta: [{ title: "Control Maturity · Anderoute V9.5" }] }),
  component: Page,
});
