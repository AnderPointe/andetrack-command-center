import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const m = H.useCommercialOperatingMaturity();
  return (
    <V115Page icon={<Activity className="size-6 text-emerald-300" />} title="Commercial Operating Maturity" blurb="Operating-model scorecards across forecast, hygiene, win/loss, renewal, expansion, QTC, partner motion.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={m.axes as any} columns={[
          { key: "axis",   label: "Axis" },
          { key: "score",  label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/operating")({
  head: () => ({ meta: [{ title: "Operating Maturity · V11.5" }] }),
  component: Page,
});
