import { createFileRoute } from "@tanstack/react-router";
import { Archive } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RETENTION_POLICIES } from "@/v25/data/mockPhase18";

export const Route = createFileRoute("/v25/retention")({
  head: () => ({ meta: [{ title: "Data Retention · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Archive className="size-6 text-emerald-300" />} title="Advanced Data Retention" blurb="Per-data-type retention policies with legal-hold support and scheduled cleanup jobs.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Data type</th><th className="p-2">Retention</th><th className="p-2">Legal hold</th><th className="p-2">Last cleanup</th><th className="p-2">Next run</th></tr></thead>
          <tbody>
            {RETENTION_POLICIES.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-2">{p.dataType}</td>
                <td className="p-2 font-mono text-xs">{p.retentionDays}d</td>
                <td className="p-2">{p.legalHold ? <Badge variant="outline" className="border-amber-500/30 text-amber-300">held</Badge> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="p-2 text-xs text-muted-foreground">{p.lastCleanup ?? "—"}</td>
                <td className="p-2 text-xs text-muted-foreground">{p.nextRun ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </V25Page>
  ),
});
