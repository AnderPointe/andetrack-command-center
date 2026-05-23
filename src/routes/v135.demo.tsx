import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V135Page } from "@/components/v135/V135Page";
import { Card } from "@/components/ui/card";
import { SimpleTable } from "@/components/v135/ui-bits";
import * as H from "@/v135/hooks";

function Page() {
  const steps = H.useV135Demo();
  const closeout = H.useV135DemoCloseout();
  const roles = H.useV135RoleGuidance();
  const headline = H.useV135ExecHeadline();
  const rlsSql = H.useV135RlsSqlSnippets();
  const edge = H.useV135EdgeVsServerFn();
  return (
    <V135Page icon={<ListChecks className="size-6 text-fuchsia-300" />} title="V13.5 Demo Flow" blurb="Multi-role durability + board strategic OS walkthrough — CEO, CFO, CRO, Board admin, MP leader, Partner lead.">
      <Card className="border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
        <div className="text-xs uppercase tracking-wide text-fuchsia-200/80">Exec headline</div>
        <p className="mt-1 text-sm">{headline.headline}</p>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Role guidance</h3>
        <SimpleTable rows={roles as any} columns={[{ key: "role", label: "Role" }, { key: "guidance", label: "Guidance" }]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Demo steps</h3>
        <SimpleTable rows={steps as any} columns={[
          { key: "role", label: "Role" }, { key: "step", label: "Step" }, { key: "expect", label: "Expect" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Edge Function vs ServerFn separation</h3>
        <SimpleTable rows={edge as any} columns={[
          { key: "kind", label: "Kind" }, { key: "surface", label: "Surface" },
          { key: "example", label: "Example" }, { key: "why", label: "Why" },
        ]} />
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">RLS policy SQL examples (mock)</h3>
        <p className="mt-1 text-xs text-muted-foreground">Illustrative only — see docs/phase40-plan.md for the full V13.5 RLS sketch list.</p>
        <div className="mt-2 space-y-2">
          {rlsSql.map((r) => (
            <div key={r.table} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
              <div className="font-mono text-xs text-fuchsia-200">{r.table}</div>
              <pre className="mt-2 overflow-x-auto text-[11px] text-muted-foreground">{r.sql}</pre>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-fuchsia-400/20 bg-fuchsia-400/5 p-4">
        <h3 className="text-sm font-semibold text-fuchsia-100">Close-out commitments</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
          {closeout.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Card>
    </V135Page>
  );
}

export const Route = createFileRoute("/v135/demo")({
  head: () => ({ meta: [{ title: "V13.5 Demo · Phase 40" }] }),
  component: Page,
});
