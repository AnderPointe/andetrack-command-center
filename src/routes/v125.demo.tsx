import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V125Page } from "@/components/v125/V125Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v125/ui-bits";
import * as H from "@/v125/hooks";

function Page() {
  const steps = H.useV125Demo();
  const guidance = H.useV125RoleGuidance();
  const closeout = H.useV125DemoCloseout();
  const boundary = H.useV125BackendBoundary();
  const rls = H.useV125RlsExamples();
  const teaser = H.useV125Phase39Teaser();
  const scope = H.useV125Scope();
  const toneMap: Record<string, string> = {
    violet: "border-violet-400/40 text-violet-200",
    sky: "border-sky-400/40 text-sky-200",
    emerald: "border-emerald-400/40 text-emerald-200",
    amber: "border-amber-400/40 text-amber-200",
    rose: "border-rose-400/40 text-rose-200",
  };
  return (
    <V125Page icon={<ListChecks className="size-6 text-teal-300" />} title="V12.5 Demo Flow" blurb="CRO → RevOps → CFO → CSM Lead → Partner → MP Ops → Board → CEO walkthrough.">
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
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[2rem_6rem_1fr] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-teal-200">{s.role}</span>
              <span>{s.step}</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Close-out commitments</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {closeout.map((c, i) => (
            <li key={i} className="grid grid-cols-[6rem_1fr_6rem] items-start gap-2 rounded border border-white/5 bg-black/20 px-3 py-1.5">
              <span className="text-teal-200">{c.role}</span>
              <span>{c.commitment}</span>
              <span className="text-right text-xs text-muted-foreground">{c.due}</span>
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">RLS examples</h3>
          <SimpleTable rows={rls as any} columns={[{ key: "table", label: "Table" }, { key: "policy", label: "Policy" }]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Server boundary</h3>
          <SimpleTable rows={boundary as any} columns={[{ key: "kind", label: "Kind" }, { key: "name", label: "Name" }, { key: "auth", label: "Auth" }]} />
        </Card>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-amber-400/20 bg-amber-400/5 p-4">
          <h3 className="text-sm font-semibold text-amber-100">Explicitly deferred in V12.5</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {scope.deferred.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </Card>
        <Card className="border-teal-400/20 bg-teal-400/5 p-4">
          <h3 className="text-sm font-semibold text-teal-100">Phase 39 (V13) teaser — not started</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {teaser.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Card>
      </div>
    </V125Page>
  );
}

export const Route = createFileRoute("/v125/demo")({
  head: () => ({ meta: [{ title: "V12.5 Demo · Phase 38" }] }),
  component: Page,
});
