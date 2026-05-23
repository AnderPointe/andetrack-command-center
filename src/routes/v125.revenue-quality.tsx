import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const q = H.useRevenueQualityControls();
  const trends = H.useRevenueQualityTrends();
  const pass = q.controls.filter((c) => c.status === "pass").length;
  const review = q.controls.filter((c) => c.status === "review").length;
  const exc = q.controls.filter((c) => c.status === "exception").length;
  return (
    <V125Page icon={<Activity className="size-6 text-teal-300" />} title="Revenue Quality Control Center" blurb="13 revenue quality controls with exception queue.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Control score" value={q.score} tone="emerald" />
        <ScoreCard label="Pass"          value={pass}    tone="sky" />
        <ScoreCard label="Review"        value={review}  tone="amber" />
        <ScoreCard label="Exception"     value={exc}     tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue control matrix</h3>
        <SimpleTable rows={q.controls as any} columns={[
          { key: "control", label: "Control" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "pass" ? "ready" : r.status === "review" ? "review" : "exception"} /> },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Exception command queue</h3>
        <SimpleTable rows={q.exceptions as any} columns={[{ key: "item", label: "Item" }, { key: "owner", label: "Owner" }, { key: "age_days", label: "Age (d)" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Revenue quality trend (last 4Q)</h3>
        <SimpleTable rows={trends as any} columns={[
          { key: "quarter", label: "Quarter" }, { key: "score", label: "Score" }, { key: "pass", label: "Pass" }, { key: "review", label: "Review" }, { key: "exception", label: "Exception" },
        ]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/revenue-quality")({
  head: () => ({ meta: [{ title: "Revenue Quality · V12.5" }] }),
  component: Page,
});
