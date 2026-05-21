import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { V7Page } from "@/components/v7/V7Page";
import { SimpleTable, StatusPill } from "@/components/v7/ui-bits";
import { Card } from "@/components/ui/card";
import { useRegulatedAIGovernance } from "@/v7/hooks";

export const Route = createFileRoute("/v7/ai-gov")({
  head: () => ({ meta: [{ title: "Regulated AI Governance · V7 · Anderoute" }] }),
  component: () => {
    const { policies, restrictions } = useRegulatedAIGovernance();
    return (
      <V7Page icon={<Bot className="size-6 text-indigo-300" />} title="AI Governance for Regulated Operations"
        blurb="Approval gates, confidence thresholds, explanation requirements, action restrictions, provider config logging, usage cost caps, safety incident playbook.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">AI control policy matrix</h3>
          <div className="mt-2">
            <SimpleTable rows={policies as any} columns={[
              { key: "policy", label: "Policy" },
              { key: "scope",  label: "Scope" },
              { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Action restriction rules</h3>
          <div className="mt-2">
            <SimpleTable rows={restrictions as any} columns={[
              { key: "action",  label: "Action" },
              { key: "allowed", label: "Allowed", render: (r: any) => <StatusPill status={r.allowed ? "allowed" : "denied"} /> },
              { key: "reason",  label: "Reason" },
            ]} />
          </div>
        </Card>
      </V7Page>
    );
  },
});
