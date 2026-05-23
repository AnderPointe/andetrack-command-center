import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { ScoreCard, Section, SimpleTable, StatusPill } from "@/components/v15/ui-bits";
import * as H from "@/v15/hooks";

function Page() {
  const a = H.useStrategicAccountPerformance();
  return (
    <V15Page icon={<Users className="size-6 text-cyan-300" />} title="Strategic Account Performance Center" blurb="Account performance board, adoption matrix, value evidence, risk, action plan.">
      <ScoreCard label="Strategic accounts" value={a.score} tone="emerald" />
      <Section title="Strategic accounts">
        <SimpleTable rows={a.accounts as any} columns={[
          { key: "account", label: "Account" }, { key: "owner", label: "CSM" }, { key: "sponsor", label: "Sponsor" },
          { key: "product", label: "Adopt" }, { key: "expansion", label: "Expansion" },
          { key: "renewal_risk", label: "Renewal", render: (r: any) => <StatusPill status={r.renewal_risk} /> },
          { key: "trust", label: "Trust" },
          { key: "mp_adopt", label: "MP" }, { key: "api_adopt", label: "API" }, { key: "copilot", label: "CoP" }, { key: "portal", label: "Portal" }, { key: "driver", label: "Driver" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "expand", label: "Expand", render: (r: any) => <StatusPill status={r.expand} /> },
          { key: "next", label: "Next" },
        ]} />
      </Section>
    </V15Page>
  );
}

export const Route = createFileRoute("/v15/accounts")({
  head: () => ({ meta: [{ title: "Strategic Accounts · V15" }] }),
  component: Page,
});
