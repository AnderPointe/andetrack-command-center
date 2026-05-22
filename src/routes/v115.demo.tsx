import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V115Page } from "@/components/v115/V115Page";
import { Card } from "@/components/ui/card";
import * as H from "@/v115/hooks";

function Page() {
  const d = H.useV115DemoFlow();
  const guidance = H.useV115RoleGuidance();
  const closeout = H.useV115DemoCloseout();
  const toneMap: Record<string, string> = {
    violet: "border-violet-400/40 text-violet-200",
    sky: "border-sky-400/40 text-sky-200",
    emerald: "border-emerald-400/40 text-emerald-200",
    amber: "border-amber-400/40 text-amber-200",
    rose: "border-rose-400/40 text-rose-200",
  };
  return (
    <V115Page icon={<ListChecks className="size-6 text-emerald-300" />} title="V11.5 Demo Flow" blurb="CRO → RevOps → CCO → CSM → Deal Desk → Pricing → Security → SE → Partner → MP → CFO → CEO walkthrough of V11.5 revenue optimization.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {guidance.map((g) => (
            <div key={g.role} className={`rounded border px-3 py-2 ${toneMap[g.tone] ?? "border-white/10"}`}>
              <div className="text-xs uppercase tracking-wider">{g.role}</div>
              <div className="mt-1 text-xs text-foreground/90">{g.focus}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo steps</h3>
        <ol className="mt-2 space-y-1.5 text-sm">
          {d.map((s, i) => (
            <li key={i} className="grid grid-cols-[2rem_5rem_1fr] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-emerald-200">{s.role}</span>
              <span>{s.step}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo close-out — signed commitments</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {closeout.map((c, i) => (
            <li key={i} className="grid grid-cols-[5rem_1fr_6rem] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-emerald-200">{c.role}</span>
              <span>{c.commitment}</span>
              <span className="text-right text-xs text-muted-foreground">{c.due}</span>
            </li>
          ))}
        </ul>
      </Card>
    </V115Page>
  );
}

export const Route = createFileRoute("/v115/demo")({
  head: () => ({ meta: [{ title: "V11.5 Demo Flow · Phase 36" }] }),
  component: Page,
});
