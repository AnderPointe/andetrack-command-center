import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const r = H.useRetentionRisk();
  return (
    <V115Page icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Retention Risk Command Center" blurb="Accounts at retention risk with save plays assigned to CSM owners. Mock-only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={r.rows as any} columns={[
          { key: "account",   label: "Account" },
          { key: "risk",      label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "reason",    label: "Reason" },
          { key: "owner",     label: "Owner" },
          { key: "save_play", label: "Save play" },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/retention")({
  head: () => ({ meta: [{ title: "Retention Risk · V11.5" }] }),
  component: Page,
});
