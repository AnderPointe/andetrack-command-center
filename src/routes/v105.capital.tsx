import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const c = H.useStrategicCapitalReadiness();
  return (
    <V105Page icon={<Wallet className="size-6 text-fuchsia-300" />} title="Strategic Capital Readiness Center" blurb="Investor and acquirer narratives, data room, revenue quality, concentration risk, references. No IPO/M&A claims.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Capital readiness" value={c.summary.readiness} tone="emerald" />
        <ScoreCard label="Data room"         value={c.summary.data_room} tone="sky" />
        <ScoreCard label="Narrative"         value={c.summary.narrative} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Capital readiness axes</h3>
        <SimpleTable rows={c.axes as any} columns={[
          { key: "axis", label: "Axis" },
          { key: "score", label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/capital")({
  head: () => ({ meta: [{ title: "Capital Readiness · V10.5" }] }),
  component: Page,
});
