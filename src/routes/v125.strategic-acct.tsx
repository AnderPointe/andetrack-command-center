import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const a = H.useStrategicAccountGrowthGovernance();
  const t1 = a.filter((r) => r.tier === "T1").length;
  const atRisk = a.filter((r) => r.churn === "high" || r.renewal === "at_risk").length;
  const expReady = a.filter((r) => r.expansion === "ready").length;
  return (
    <V125Page icon={<Users className="size-6 text-teal-300" />} title="Strategic Account Growth Governance" blurb="T1/T2 strategic account growth board — sponsor, whitespace, adoption, cadence.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Accounts"        value={a.length}  tone="sky" />
        <ScoreCard label="Tier-1"          value={t1}        tone="violet" />
        <ScoreCard label="Expansion-ready" value={expReady}  tone="emerald" />
        <ScoreCard label="At risk"         value={atRisk}    tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <SimpleTable rows={a as any} columns={[
          { key: "account", label: "Account" }, { key: "tier", label: "Tier" }, { key: "owner", label: "Owner" }, { key: "sponsor", label: "Sponsor" }, { key: "whitespace", label: "Whitespace" }, { key: "expansion", label: "Expand" }, { key: "renewal", label: "Renew" }, { key: "churn", label: "Churn" }, { key: "copilot", label: "CoPilot %" }, { key: "mp", label: "MP %" }, { key: "cadence", label: "Cadence" }, { key: "action", label: "Next action" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/strategic-acct")({
  head: () => ({ meta: [{ title: "Strategic Accounts · V12.5" }] }),
  component: Page,
});
