import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { V105Page } from "@/components/v105/V105Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v105/ui-bits";
import * as H from "@/v105/hooks";

function Page() {
  const c = H.useCategoryLeadershipExecution();
  return (
    <V105Page icon={<Crown className="size-6 text-fuchsia-300" />} title="Category Leadership Execution" blurb="Narrative, education assets, differentiator publishing, customer + partner stories.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Execution score"   value={c.summary.score} tone="emerald" />
        <ScoreCard label="Published / 30d"   value={c.summary.items_published_30d} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Leadership content pipeline</h3>
        <SimpleTable rows={c.items as any} columns={[
          { key: "item", label: "Item" }, { key: "channel", label: "Channel" }, { key: "owner", label: "Owner" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
        ]} />
      </Card>
    </V105Page>
  );
}

export const Route = createFileRoute("/v105/category")({
  head: () => ({ meta: [{ title: "Category Execution · V10.5" }] }),
  component: Page,
});
