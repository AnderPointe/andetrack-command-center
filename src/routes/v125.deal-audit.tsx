import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

const STEPS = ["committee","discovery","demo","tech","security","procurement","pilot","case","pricing","desk","sponsor","close_plan","contract"] as const;
const LABELS: Record<typeof STEPS[number], string> = {
  committee: "Cmte.", discovery: "Disc.", demo: "Demo", tech: "Tech", security: "Sec", procurement: "Proc", pilot: "Pilot", case: "Case", pricing: "Price", desk: "Desk", sponsor: "Spon", close_plan: "CP", contract: "Ctr",
};

function Page() {
  const a = H.useDealExecutionAuditability();
  return (
    <V125Page icon={<ClipboardList className="size-6 text-teal-300" />} title="Deal Execution Auditability" blurb="13-step deal execution checklist evidenced per deal.">
      <div className="grid gap-3 md:grid-cols-3">
        <ScoreCard label="Audit score" value={a.score}        tone="emerald" />
        <ScoreCard label="Deals"       value={a.rows.length}  tone="sky" />
        <ScoreCard label="Steps"       value={STEPS.length}   tone="violet" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4 overflow-x-auto">
        <h3 className="text-sm font-semibold">Deal execution audit checklist</h3>
        <table className="mt-2 w-full text-xs">
          <thead className="text-muted-foreground">
            <tr><th className="text-left p-1">Deal</th>{STEPS.map((s) => <th key={s} className="p-1">{LABELS[s]}</th>)}</tr>
          </thead>
          <tbody>
            {a.rows.map((d) => (
              <tr key={d.deal} className="border-t border-white/5">
                <td className="p-1 font-medium">{d.deal}</td>
                {STEPS.map((s) => <td key={s} className="p-1 text-center">{(d as any)[s] ? "✓" : "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/deal-audit")({
  head: () => ({ meta: [{ title: "Deal Audit · V12.5" }] }),
  component: Page,
});
