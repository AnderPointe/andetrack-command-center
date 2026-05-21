import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ENTERPRISE_SEC_CONTROLS, V25_RLS_EXAMPLES } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/security")({
  head: () => ({ meta: [{ title: "Enterprise Security V2.5 · Anderoute" }] }),
  component: () => (
    <V25Page icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Enterprise Security Controls V2.5" blurb="Reviews, audit exports, retention controls, RBAC matrix, and RLS policies. Not a SOC 2 certification — evidence collection only.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Controls</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Control</th><th className="p-2">Status</th></tr></thead>
          <tbody>
            {ENTERPRISE_SEC_CONTROLS.map((c) => (
              <tr key={c.id} className="border-t border-white/10"><td className="p-2">{c.control}</td><td className="p-2"><Badge variant="outline" className={c.status === "configured" ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>{c.status}</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">RLS policy examples</h2>
        <div className="mt-3 space-y-2 text-sm">
          {V25_RLS_EXAMPLES.map((r) => (
            <div key={r.table} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-between"><div className="font-mono text-xs text-violet-300">{r.table}</div><div className="text-xs text-muted-foreground">{r.policy}</div></div>
              <pre className="mt-2 overflow-x-auto text-[11px] text-muted-foreground">{r.sql}</pre>
            </div>
          ))}
        </div>
      </Card>
    </V25Page>
  ),
});
