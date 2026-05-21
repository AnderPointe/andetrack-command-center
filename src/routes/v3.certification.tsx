import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CERT_READINESS, EDGE_FUNCTION_SEPARATION, RLS_TEMPLATES } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/certification")({
  head: () => ({ meta: [{ title: "Certification Readiness · Anderoute V3" }] }),
  component: () => {
    const avg = Math.round(CERT_READINESS.reduce((s, c) => s + c.score, 0) / CERT_READINESS.length);
    return (
      <V3Page icon={<ShieldCheck className="size-6 text-sky-300" />} title="Enterprise Certification Readiness"
        blurb="SOC 2 readiness preparation, pen test plan, mobile security review, data retention, access control, and incident response. Not certified — readiness only.">
        <Card className="border-amber-500/30 bg-amber-500/[0.04] p-4 text-sm">
          <strong className="text-amber-200">Disclaimer:</strong>
          <span className="ml-2 text-muted-foreground">Anderoute is not SOC 2 certified. This dashboard tracks readiness only.</span>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Overall readiness</h2><Badge variant="outline" className="border-sky-500/40 text-sky-300">{avg}%</Badge></div>
          <Progress value={avg} className="mt-3 h-1.5" />
          <div className="mt-4 grid gap-2 md:grid-cols-3">{CERT_READINESS.map((c) => (
            <div key={c.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex items-center justify-between"><span>{c.area}</span><span className="font-mono text-xs">{c.score}</span></div>
              <Progress value={c.score} className="mt-2 h-1" />
              <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{c.status.replace("_", " ")}</div>
            </div>
          ))}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Edge Function vs server fn separation</h3>
          <table className="mt-2 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Function</th><th className="p-2">Runtime</th><th className="p-2">Why</th></tr></thead>
            <tbody>{EDGE_FUNCTION_SEPARATION.map((f) => (
              <tr key={f.fn} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{f.fn}</td><td className="p-2"><Badge variant="outline" className="border-sky-500/40 text-sky-300">{f.runtime}</Badge></td><td className="p-2 text-xs text-muted-foreground">{f.reason}</td></tr>
            ))}</tbody>
          </table>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">RLS policy templates</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {RLS_TEMPLATES.map((r) => (
              <li key={r.table} className="rounded border border-white/10 bg-black/40 p-2">
                <div className="font-mono text-xs text-sky-300">{r.table}</div>
                <pre className="mt-1 overflow-x-auto whitespace-pre-wrap text-[11px] text-muted-foreground">{r.sql}</pre>
              </li>
            ))}
          </ul>
        </Card>
      </V3Page>
    );
  },
});
