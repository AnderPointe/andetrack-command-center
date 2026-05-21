import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useAdvancedAutomationGovernance } from "@/v6/hooks";

export const Route = createFileRoute("/v6/automation-gov")({
  head: () => ({ meta: [{ title: "Automation Governance · V6" }] }),
  component: () => {
    const { levels, policies } = useAdvancedAutomationGovernance();
    return (
      <V6Page icon={<Workflow className="size-6 text-emerald-300" />} title="Advanced Automation Governance"
        blurb="Every automation has an explicit risk level, approval requirement, confidence threshold, audit + rollback posture. Fully autonomous dispatch is prohibited.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Automation levels</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {levels.map(l => <StatusPill key={l} status={l} />)}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Policy matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={policies} columns={[
              { key: "action",     label: "Action" },
              { key: "level",      label: "Level",      render: (r) => <StatusPill status={r.level} /> },
              { key: "approval",   label: "Approval" },
              { key: "confidence", label: "Min conf" },
              { key: "audit",      label: "Audit",      render: (r) => <StatusPill status={r.audit ? "complete" : "needs"} /> },
              { key: "rollback",   label: "Rollback",   render: (r) => <StatusPill status={r.rollback ? "complete" : "needs"} /> },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
