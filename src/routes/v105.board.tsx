import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const b = H.useBoardGrowthGovernance();
  return (
    <V105Page icon={<Trophy className="size-6 text-fuchsia-300" />} title="Board-Level Growth Governance" blurb="Growth initiatives, executive owners, milestones, risks and decisions.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Growth initiatives</h3>
        <SimpleTable rows={b.items as any} columns={[
          { key: "initiative", label: "Initiative" }, { key: "owner", label: "Owner" },
          { key: "risk", label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
          { key: "milestone", label: "Milestone" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/board")({
  head: () => ({ meta: [{ title: "Board Growth Governance · V10.5" }] }),
  component: Page,
});
