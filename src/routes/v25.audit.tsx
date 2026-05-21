import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AUDIT_FILTERS, AUDIT_EXPORT_FORMATS, AUDIT_SAMPLE, AUDIT_EXPORT_RUNS } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/audit")({
  head: () => ({ meta: [{ title: "Audit + Export · Anderoute" }] }),
  component: () => (
    <V25Page icon={<ScrollText className="size-6 text-emerald-300" />} title="Advanced Audit + Export" blurb="Filter audit events across users, roles, companies, customers, drivers, loads, integrations, and billing. Export to CSV / JSON (PDF placeholder).">
      <Card className="border-white/10 bg-white/[0.02] p-3 text-sm">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Filters</div>
        <div className="mt-1 flex flex-wrap gap-1">{AUDIT_FILTERS.map((f) => <Badge key={f} variant="outline" className="border-white/15 text-muted-foreground text-[10px]">{f}</Badge>)}</div>
        <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Export formats</div>
        <div className="mt-1 flex flex-wrap gap-1">{AUDIT_EXPORT_FORMATS.map((f) => <Badge key={f} variant="outline" className="border-sky-500/30 text-sky-300 text-[10px]">{f}</Badge>)}</div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Recent events</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">At</th><th className="p-2">Actor</th><th className="p-2">Action</th><th className="p-2">Target</th><th className="p-2">Company</th></tr></thead>
          <tbody>
            {AUDIT_SAMPLE.map((a) => (
              <tr key={a.id} className="border-t border-white/10"><td className="p-2 text-xs text-muted-foreground">{a.at}</td><td className="p-2 font-mono text-xs">{a.actor}</td><td className="p-2 font-mono text-xs text-violet-300">{a.action}</td><td className="p-2 font-mono text-xs">{a.target}</td><td className="p-2 text-xs">{a.company}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
