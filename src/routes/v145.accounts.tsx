import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V145Page } from "@/components/v145/V145Page";
import { ScoreCard, Section, SimpleTable } from "@/components/v145/ui-bits";
import * as H from "@/v145/hooks";

function Page() {
  const a = H.useStrategicAccountGrowthDiscipline();
  const med = a.filter(x => x.renewal_risk === "med").length;
  const avg = Math.round(a.reduce((s,x)=>s+x.value,0)/a.length);
  return (
    <V145Page icon={<Users className="size-6 text-fuchsia-300" />} title="Strategic Account Growth Discipline" blurb="Account owner, exec sponsor, expansion execution, renewal risk, value evidence, blockers, next exec action.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Strategic accounts" value={a.length} tone="violet" />
        <ScoreCard label="Avg value score" value={avg} tone="emerald" />
        <ScoreCard label="Med-risk renewals" value={med} tone="amber" />
      </div>
      <Section title="StrategicAccountGrowthBoard">
        <SimpleTable rows={a.map(x => ({ ...x, blockers: x.blockers.join(", ") || "—" })) as any} columns={[
          { key: "account", label: "Account" }, { key: "sponsor", label: "Sponsor" },
          { key: "csm", label: "CSM" }, { key: "value", label: "Value" },
          { key: "renewal_risk", label: "Renewal risk" }, { key: "blockers", label: "Blockers" },
          { key: "next", label: "Next action" },
        ]} />
      </Section>
    </V145Page>
  );
}

export const Route = createFileRoute("/v145/accounts")({ head: () => ({ meta: [{ title: "Strategic Accounts · V14.5" }] }), component: Page });
