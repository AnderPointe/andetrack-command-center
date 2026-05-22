import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const b = H.useCapitalBoardGrowthReporting();
  const ready = b.sections.filter((s) => s.status === "ready").length;
  const review = b.sections.filter((s) => s.status === "review").length;
  return (
    <V125Page icon={<FileBarChart className="size-6 text-teal-300" />} title="Capital-Grade Board Growth Reporting" blurb="Quarterly capital board pack — growth ops, auditability, revenue intelligence, partner, marketplace, risk, data room, decisions.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Sections"  value={b.sections.length}  tone="sky" />
        <ScoreCard label="Ready"     value={ready}              tone="emerald" />
        <ScoreCard label="Review"    value={review}             tone="amber" />
        <ScoreCard label="Decisions" value={b.decisions.length} tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Pack sections</h3>
        <SimpleTable rows={b.sections as any} columns={[
          { key: "section", label: "Section" }, { key: "owner", label: "Owner" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> }, { key: "notes", label: "Notes" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Decision queue</h3>
        <SimpleTable rows={b.decisions as any} columns={[{ key: "id", label: "ID" }, { key: "subject", label: "Subject" }, { key: "owner", label: "Owner" }, { key: "due", label: "Due" }, { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "pending" ? "review" : "ready"} /> }]} />
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/board")({
  head: () => ({ meta: [{ title: "Board Growth · V12.5" }] }),
  component: Page,
});
