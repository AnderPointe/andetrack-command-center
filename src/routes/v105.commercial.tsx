import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const c = H.useEnterpriseCommercialization();
  return (
    <V105Page icon={<Megaphone className="size-6 text-fuchsia-300" />} title="Enterprise Commercialization Command Center" blurb="Pipeline, stage board, blockers, trust + MP proof status, executive sponsor, next action.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Commercial scale" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Active opps"      value={c.pipeline.length} tone="sky" />
        <ScoreCard label="Open blockers"    value={c.blockers.length} tone="amber" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Enterprise pipeline</h3>
        <SimpleTable rows={c.pipeline as any} columns={[
          { key: "id", label: "ID" }, { key: "account", label: "Account" }, { key: "stage", label: "Stage" },
          { key: "arr_band", label: "ARR band" },
          { key: "win_prob", label: "Win prob", render: (r: any) => `${r.win_prob}%` },
          { key: "trust", label: "Trust", render: (r: any) => <StatusPill status={r.trust} /> },
          { key: "mp_proof", label: "MP proof", render: (r: any) => <StatusPill status={r.mp_proof} /> },
          { key: "sponsor", label: "Sponsor" },
          { key: "next", label: "Next action" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Deal stage board</h3>
        <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-6">
          {c.stages.map(s => (
            <div key={s.stage} className="rounded-lg border border-white/10 bg-black/30 p-3 text-center">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.stage}</div>
              <div className="mt-1 text-2xl font-semibold">{s.count}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-amber-400/30 bg-amber-500/5 p-4">
        <h3 className="text-sm font-semibold text-amber-200">Open deal blockers</h3>
        <SimpleTable rows={c.blockers as any} columns={[
          { key: "deal", label: "Deal" }, { key: "blocker", label: "Blocker" }, { key: "owner", label: "Owner" },
          { key: "age_days", label: "Age (d)" },
          { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/commercial")({
  head: () => ({ meta: [{ title: "Enterprise Commercialization · V10.5" }] }),
  component: Page,
});
