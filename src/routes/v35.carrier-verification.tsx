import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V35Page } from "@/components/v35/V35Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VERIFICATION_STEPS, VERIFICATION_QUEUE } from "@/v35/data/mockPhase20";

const STATUS_COLOR: Record<string, string> = {
  approved: "border-emerald-500/40 text-emerald-300",
  in_review: "border-sky-500/40 text-sky-300",
  submitted: "border-sky-500/40 text-sky-300",
  needs_more_info: "border-amber-500/40 text-amber-300",
  rejected: "border-rose-500/40 text-rose-300",
};

export const Route = createFileRoute("/v35/carrier-verification")({
  head: () => ({ meta: [{ title: "Carrier Verification · Anderoute V3.5" }] }),
  component: () => (
    <V35Page icon={<ShieldCheck className="size-6 text-amber-300" />} title="Carrier Verification Workflow"
      blurb="Draft → submitted → in review → approved or rejected. Authority / insurance / W-9 remain placeholder fields.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Verification checklist</h3>
        <ol className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">
          {VERIFICATION_STEPS.map((s, i) => (
            <li key={s} className="rounded border border-white/10 bg-black/20 px-2 py-1"><span className="mr-2 font-mono text-xs text-amber-300">{i + 1}.</span>{s}</li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Approval queue</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-1">Carrier</th><th className="p-1">Submitted</th><th className="p-1">Status</th></tr></thead>
          <tbody>{VERIFICATION_QUEUE.map((q) => (
            <tr key={q.id} className="border-t border-white/10"><td className="p-1">{q.carrier}</td><td className="p-1">{q.submitted}</td><td className="p-1"><Badge variant="outline" className={STATUS_COLOR[q.status] || ""}>{q.status}</Badge></td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V35Page>
  ),
});
