import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V4Page } from "@/components/v4/V4Page";
import { Card } from "@/components/ui/card";
import { DEMO_STEPS_V4, RLS_POLICY_EXAMPLES_V4, EDGE_FN_PLAN_V4 } from "@/v4/data/mockPhase21";

export const Route = createFileRoute("/v4/demo")({
  head: () => ({ meta: [{ title: "V4 Demo Flow · Anderoute" }] }),
  component: () => {
    const tanstack = EDGE_FN_PLAN_V4.filter(f => f.runtime.startsWith("TanStack"));
    const edge     = EDGE_FN_PLAN_V4.filter(f => f.runtime.startsWith("Supabase"));
    return (
      <V4Page icon={<ListChecks className="size-6 text-sky-300" />} title="V4 Demo Flow"
        blurb="End-to-end V4 enterprise launch walkthrough with supporting RLS examples and Edge Function separation.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Walkthrough</h3>
          <ol className="mt-2 space-y-2 text-sm">{DEMO_STEPS_V4.map((s,i) => (
            <li key={i} className="rounded border border-white/10 bg-black/20 p-2"><span className="text-xs text-muted-foreground">Step {i+1}</span><div>{s}</div></li>
          ))}</ol>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">RLS policy examples</h3>
          <ul className="mt-2 space-y-1 text-xs font-mono">{RLS_POLICY_EXAMPLES_V4.map(r => (
            <li key={r.table} className="rounded border border-white/10 bg-black/20 p-2">
              <span className="text-sky-300">{r.table}</span>
              <div className="text-muted-foreground">{r.policy}</div>
            </li>))}
          </ul>
        </Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">TanStack server functions <span className="text-xs text-muted-foreground">(internal, auth-bound)</span></h3>
            <ul className="mt-2 space-y-1 text-xs">{tanstack.map(f => (
              <li key={f.fn} className="rounded border border-white/10 bg-black/20 p-2">
                <span className="font-mono text-sky-300">{f.fn}</span>
                <div className="text-muted-foreground">{f.reason}</div>
              </li>))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold">Supabase Edge Functions <span className="text-xs text-muted-foreground">(external/signed)</span></h3>
            <ul className="mt-2 space-y-1 text-xs">{edge.map(f => (
              <li key={f.fn} className="rounded border border-white/10 bg-black/20 p-2">
                <span className="font-mono text-amber-300">{f.fn}</span>
                <div className="text-muted-foreground">{f.reason}</div>
              </li>))}
            </ul>
          </Card>
        </div>
      </V4Page>
    );
  },
});
