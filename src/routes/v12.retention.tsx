import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcw } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const r = H.useExpansionRetention();
  return (
    <V12Page icon={<RefreshCcw className="size-6 text-cyan-300" />} title="Expansion & Retention Command Center" blurb="Upcoming renewals, expansion readiness, churn risk, and recommended save / expansion plays per account.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Upcoming renewals" value={String(r.upcoming_renewals)} tone="sky" />
        <ScoreCard label="At-risk"           value={String(r.at_risk)}           tone="amber" />
        <ScoreCard label="Expansion-ready"   value={String(r.expansion_ready)}   tone="emerald" />
        <ScoreCard label="Churn risk"        value={String(r.churn_risk)}        tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "account", label: "Account" },
          { key: "renewal_in_days", label: "Renewal in", render: (r: any) => `${r.renewal_in_days}d` },
          { key: "risk", label: "Risk" }, { key: "reason", label: "Reason" }, { key: "play", label: "Play" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/retention")({
  head: () => ({ meta: [{ title: "Expansion & Retention · V12" }] }),
  component: Page,
});
