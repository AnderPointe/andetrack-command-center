import { createFileRoute } from "@tanstack/react-router";
import { WifiOff } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OFFLINE_QUEUE } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/offline")({
  head: () => ({ meta: [{ title: "Mobile Offline · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<WifiOff className="size-6 text-sky-300" />} title="Advanced Mobile Offline Hardening"
      blurb="Sync priority, retry, conflict resolution, and driver-visible sync status. Voice commands, POD drafts, and status updates all queue offline.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Offline action queue</h2>
        <table className="mt-2 w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Driver</th><th className="p-2">Kind</th><th className="p-2">Created</th><th className="p-2">Retries</th><th className="p-2">Priority</th><th className="p-2">Conflict</th></tr></thead>
          <tbody>{OFFLINE_QUEUE.map((q) => (
            <tr key={q.id} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{q.driver}</td><td className="p-2">{q.kind}</td><td className="p-2 font-mono text-xs">{q.created}</td><td className="p-2 font-mono">{q.retries}</td><td className="p-2"><Badge variant="outline" className={q.priority === "high" ? "border-rose-500/40 text-rose-300" : q.priority === "normal" ? "border-sky-500/40 text-sky-300" : "border-white/15 text-muted-foreground"}>{q.priority}</Badge></td><td className="p-2">{q.conflict ? <Badge variant="outline" className="border-amber-500/40 text-amber-300">resolve</Badge> : <span className="text-xs text-muted-foreground">—</span>}</td></tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
