import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V12Page } from "@/components/v12/V12Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v12/ui-bits";
import * as H from "@/v12/hooks";

function Page() {
  const d = H.useDealExecutionControl();
  return (
    <V12Page icon={<ClipboardList className="size-6 text-cyan-300" />} title="Deal Execution Control Tower" blurb="Stage, age, buying committee, technical / security / procurement gates, pricing approval, and close-plan completeness per deal.">
      <div className="grid gap-3 md:grid-cols-2">
        <ScoreCard label="Execution score" value={d.score} tone="emerald" />
        <ScoreCard label="Deals tracked"   value={String(d.rows.length)} tone="sky" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <SimpleTable rows={d.rows as any} columns={[
          { key: "deal", label: "Deal" }, { key: "stage", label: "Stage" }, { key: "days", label: "Days" },
          { key: "committee", label: "Committee" }, { key: "tech", label: "Tech" }, { key: "sec", label: "Sec" },
          { key: "proc", label: "Proc" }, { key: "price", label: "Pricing" },
          { key: "close_plan", label: "Close plan", render: (r: any) => `${r.close_plan}%` },
        ]} />
      </Card>
    </V12Page>
  );
}

export const Route = createFileRoute("/v12/deal-execution")({
  head: () => ({ meta: [{ title: "Deal Execution · V12" }] }),
  component: Page,
});
