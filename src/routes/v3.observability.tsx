import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOBILE_OBSERVABILITY, MOBILE_VERSION_POLICY } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/observability")({
  head: () => ({ meta: [{ title: "Mobile Observability · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Activity className="size-6 text-sky-300" />} title="Mobile Observability"
      blurb="Driver app version, OS, permissions, sync age, offline queue, and health score. Crash reporting is placeholder.">
      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm">
        <h3 className="text-sm font-semibold">Mobile version policy</h3>
        <p className="mt-1 text-muted-foreground">Min <code>{MOBILE_VERSION_POLICY.min_version}</code> · Recommended <code>{MOBILE_VERSION_POLICY.recommended}</code> · Block below <code>{MOBILE_VERSION_POLICY.enforce_block_below}</code></p>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <table className="w-full text-sm"><thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Driver</th><th className="p-2">App</th><th className="p-2">OS</th><th className="p-2">Health</th><th className="p-2">Last sync</th><th className="p-2">Perms</th><th className="p-2">Queue</th></tr></thead>
          <tbody>{MOBILE_OBSERVABILITY.map((d) => (
            <tr key={d.driver} className="border-t border-white/10">
              <td className="p-2 font-mono text-xs">{d.driver}</td>
              <td className="p-2 font-mono text-xs">{d.app}</td>
              <td className="p-2 text-muted-foreground">{d.os}</td>
              <td className="p-2 w-32"><Progress value={d.health} className="h-1" /><span className="text-[10px] text-muted-foreground">{d.health}</span></td>
              <td className="p-2 font-mono text-xs">{d.last_sync_sec}s</td>
              <td className="p-2"><Badge variant="outline" className={d.perms === "ok" ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"}>{d.perms}</Badge></td>
              <td className="p-2 font-mono">{d.offline_queue}</td>
            </tr>
          ))}</tbody></table>
      </Card>
    </V3Page>
  ),
});
