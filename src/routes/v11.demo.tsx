import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { Card } from "@/components/ui/card";
import { ExecBanner, OverlayStrip, SimpleTable } from "@/components/v11/ui-bits";
import * as H from "@/v11/hooks";

const TONE: Record<string, string> = {
  violet: "border-violet-400/30 text-violet-200",
  sky: "border-sky-400/30 text-sky-200",
  amber: "border-amber-400/30 text-amber-200",
  emerald: "border-emerald-400/30 text-emerald-200",
  rose: "border-rose-400/30 text-rose-200",
};

function Page() {
  const steps = H.useV11DemoFlow();
  const closeout = H.useV11DemoCloseout();
  const guidance = H.useV11RoleGuidance();
  const rls = H.useV11RlsExamples();
  return (
    <V11Page icon={<ListChecks className="size-6 text-cyan-300" />} title="V11 Demo Flow"
      blurb="17-step executive walkthrough of the V11 enterprise revenue maturity suite with role guidance and close-out commitments.">
      <ExecBanner h={H.useV11ExecHeadline()} />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {guidance.map((g) => (
            <div key={g.role} className={`rounded-lg border ${TONE[g.tone]} bg-white/[0.02] p-3 text-sm`}>
              <div className="text-xs uppercase tracking-wide opacity-80">{g.role}</div>
              <div className="mt-1">{g.focus}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Walkthrough</h3>
        <ol className="mt-2 space-y-2 text-sm">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[2rem_8rem_1fr] items-start gap-2 border-b border-white/5 pb-2 last:border-0">
              <span className="text-muted-foreground">{i + 1}.</span>
              <span className="font-medium text-cyan-200">{s.role}</span>
              <span>{s.step}</span>
            </li>
          ))}
        </ol>
      </Card>

      <OverlayStrip items={H.useV11ExecutionOverlays()} title="V11 executive overlays" />

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo close-out commitments</h3>
        <SimpleTable rows={closeout as any} columns={[
          { key: "role", label: "Role" }, { key: "commitment", label: "Commitment" }, { key: "due", label: "Due" },
        ]} />
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy references (mock)</h3>
        <p className="mt-1 text-xs text-muted-foreground">See <code>docs/phase35-polish.md</code> for the full V11 RLS sketch.</p>
        <ul className="mt-2 grid gap-1.5 text-sm md:grid-cols-2">
          {rls.map((r) => <li key={r} className="rounded border border-white/5 bg-black/20 px-3 py-1.5 text-muted-foreground">— {r}</li>)}
        </ul>
      </Card>
    </V11Page>
  );
}

export const Route = createFileRoute("/v11/demo")({
  head: () => ({ meta: [{ title: "V11 Demo Flow · Phase 35" }] }),
  component: Page,
});
