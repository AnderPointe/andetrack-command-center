import { createFileRoute } from "@tanstack/react-router";
import { Archive } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const c = H.usePlatformContinuity();
  return (
    <V95Page icon={<Archive className="size-6 text-cyan-300" />} title="Platform Legacy and Continuity Planning" blurb="BCP / DR / backup-restore / incident response / vendor/partner/customer dependency / documentation / succession / data export placeholders.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Continuity readiness" value={c.summary.score} tone="emerald" />
        <ScoreCard label="Domains tracked"      value={c.items.length} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Continuity items</h3>
        <div className="mt-2">
          <SimpleTable rows={c.items as any} columns={[
            { key: "area", label: "Area" },
            { key: "maturity", label: "Maturity", render: (r: any) => `${r.maturity}%` },
            { key: "owner", label: "Owner" },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/continuity")({
  head: () => ({ meta: [{ title: "Continuity · Anderoute V9.5" }] }),
  component: Page,
});
