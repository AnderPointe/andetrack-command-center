import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const rows = H.useEnterpriseGrowthDiscipline();
  return (
    <V12Page icon={<TrendingUp className="size-6 text-cyan-300" />} title="Enterprise Growth Discipline Dashboard" blurb="10 growth motions with owner, targets, blockers, risk, and execution status. Impact remains a placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={rows as any} columns={[
          { key: "motion", label: "Motion" }, { key: "owner", label: "Owner" },
          { key: "targets", label: "Targets" }, { key: "blockers", label: "Blockers" },
          { key: "risk", label: "Risk" }, { key: "status", label: "Status" },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/growth")({
  head: () => ({ meta: [{ title: "Growth Discipline · V12" }] }),
  component: Page,
});
