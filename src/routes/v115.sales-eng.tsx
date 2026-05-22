import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import { SimpleTable, StatusPill } from "@/components/v115/ui-bits";
import * as H from "@/v115/hooks";

function Page() {
  const s = H.useSalesEngineeringScale();
  return (
    <V115Page icon={<Wrench className="size-6 text-emerald-300" />} title="Sales Engineering Scale Center" blurb="Coverage, reusable assets, POC win rate, trust deliverables.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={s.areas as any} columns={[
          { key: "area",   label: "Area" },
          { key: "score",  label: "Score", render: (r: any) => `${r.score}%` },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/sales-eng")({
  head: () => ({ meta: [{ title: "Sales Engineering · V11.5" }] }),
  component: Page,
});
