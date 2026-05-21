import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable, ScoreCard, KpiGrid } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalCustomerSuccessOperations } from "@/v8/hooks";

export const Route = createFileRoute("/v8/customer-success")({
  head: () => ({ meta: [{ title: "Global Customer Success · Anderoute" }] }),
  component: () => {
    const { summary, accounts } = useGlobalCustomerSuccessOperations();
    return (
      <V8Page icon={<Users className="size-6 text-violet-300" />} title="Global Customer Success Operations"
        blurb="Global account health, regulated customer status, country adoption, renewal risk, expansion, and executive sponsors.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="CS score" value={summary.score} tone="emerald" />
          <ScoreCard label="At-risk accounts" value={summary.at_risk} tone="rose" />
          <ScoreCard label="Expansion open" value={summary.expansion_open} tone="sky" />
          <ScoreCard label="Regulated strong" value={summary.regulated_strong} tone="emerald" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Active accounts", value: summary.accounts },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={accounts as any} columns={[
            { key: "account", label: "Account" },
            { key: "country", label: "Country" },
            { key: "health",  label: "Health" },
            { key: "regulated", label: "Regulated", render: (r: any) => (r.regulated ? "yes" : "no") },
            { key: "adoption", label: "Adoption" },
            { key: "renewal_risk", label: "Renewal" },
            { key: "expansion", label: "Expansion" },
            { key: "success_owner", label: "AM" },
            { key: "exec_sponsor", label: "Exec sponsor" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
