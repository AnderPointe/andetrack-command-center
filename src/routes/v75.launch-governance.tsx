import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useExecutiveGlobalLaunchGovernance } from "@/v75/hooks";

export const Route = createFileRoute("/v75/launch-governance")({
  head: () => ({ meta: [{ title: "Executive Global Launch Governance · V7.5 · Anderoute" }] }),
  component: () => {
    const { approvals } = useExecutiveGlobalLaunchGovernance();
    return (
      <V75Page icon={<Crown className="size-6 text-indigo-300" />} title="Executive Global Launch Governance"
        blurb="Approval queue: country launch, regional marketplace, regulated customer go-live, international partner launch, data residency / financial / compliance / support exceptions.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={approvals as any} columns={[
            { key: "title",  label: "Request" },
            { key: "type",   label: "Type" },
            { key: "owner",  label: "Owner" },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          {approvals.filter(a => a.conditions.length > 0).map(a => (
            <Card key={a.id} className="border-white/10 bg-white/[0.02] p-4 text-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{a.title}</h4>
                <StatusPill status={a.status} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Conditions:</p>
              <ul className="mt-1 list-disc pl-5 text-xs">{a.conditions.map(c => <li key={c}>{c}</li>)}</ul>
            </Card>
          ))}
        </div>
      </V75Page>
    );
  },
});
