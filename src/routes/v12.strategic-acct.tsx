import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useStrategicAccountGovernance();
  return (
    <V12Page icon={<Users className="size-6 text-cyan-300" />} title="Strategic Account Governance Center" blurb="Sponsor matrix, health, adoption, support burden, blockers, next action, and review cadence per strategic account.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "account", label: "Account" }, { key: "ae", label: "AE" }, { key: "csm", label: "CSM" }, { key: "sponsor", label: "Exec sponsor" },
          { key: "health",  label: "Health", render: (r: any) => `${r.health}%` },
          { key: "adopt",   label: "Adopt",  render: (r: any) => `${r.adopt}%` },
          { key: "support", label: "Support" }, { key: "blockers", label: "Blockers" }, { key: "next", label: "Next action" }, { key: "cadence", label: "Cadence" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/strategic-acct")({
  head: () => ({ meta: [{ title: "Strategic Accounts · V12" }] }),
  component: Page,
});
