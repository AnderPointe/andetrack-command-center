import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const e = H.useExpansionDiscipline();
  return (
    <V105Page icon={<Map className="size-6 text-fuchsia-300" />} title="National / Global Expansion Discipline" blurb="Country readiness across market, partner, marketplace, billing, support, compliance.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Discipline score" value={e.summary.score} tone="emerald" />
        <ScoreCard label="Countries tracked" value={e.countries.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Country readiness</h3>
        <SimpleTable rows={e.countries as any} columns={[
          { key: "country", label: "Country" },
          { key: "market", label: "Market", render: (r: any) => `${r.market}%` },
          { key: "partner", label: "Partner", render: (r: any) => `${r.partner}%` },
          { key: "mp", label: "MP", render: (r: any) => `${r.mp}%` },
          { key: "billing", label: "Billing", render: (r: any) => `${r.billing}%` },
          { key: "support", label: "Support", render: (r: any) => `${r.support}%` },
          { key: "compliance", label: "Compliance", render: (r: any) => `${r.compliance}%` },
          { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/expansion")({
  head: () => ({ meta: [{ title: "Expansion Discipline · V10.5" }] }),
  component: Page,
});
