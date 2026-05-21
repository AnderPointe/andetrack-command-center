import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { V3Page } from "@/components/v3/V3Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOBILE_POLICY_SETTINGS, FEATURE_FLAG_GROUPS, ENTERPRISE_ADMIN_AUDIT } from "@/v3/data/mockPhase19";

export const Route = createFileRoute("/v3/admin")({
  head: () => ({ meta: [{ title: "Enterprise Admin · Anderoute V3" }] }),
  component: () => (
    <V3Page icon={<Settings2 className="size-6 text-sky-300" />} title="Advanced Enterprise Admin"
      blurb="Mobile policy settings, feature flag groups, integration permissions, and support access controls.">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Mobile policy settings</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{MOBILE_POLICY_SETTINGS.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-2 py-1.5"><span>{p.policy}</span><Badge variant="outline" className="border-sky-500/40 text-sky-300">{p.value}</Badge></li>
          ))}</ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Feature flag groups</h3>
          <ul className="mt-2 space-y-1.5 text-sm">{FEATURE_FLAG_GROUPS.map((g) => (
            <li key={g.id} className="rounded border border-white/10 bg-black/20 p-2">
              <div className="font-medium">{g.label}</div>
              <div className="mt-1 flex flex-wrap gap-1">{g.flags.map((f) => (<Badge key={f} variant="outline" className="border-white/15 text-xs">{f}</Badge>))}</div>
            </li>
          ))}</ul>
        </Card>
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Recent admin changes</h3>
        <table className="mt-2 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Time</th><th className="p-2">Actor</th><th className="p-2">Change</th><th className="p-2">From → To</th></tr></thead>
          <tbody>{ENTERPRISE_ADMIN_AUDIT.map((a, i) => (
            <tr key={i} className="border-t border-white/10"><td className="p-2 font-mono text-xs">{a.ts}</td><td className="p-2 font-mono text-xs">{a.actor}</td><td className="p-2">{a.change}</td><td className="p-2 text-xs text-muted-foreground">{a.from} → {a.to}</td></tr>
          ))}</tbody>
        </table>
      </Card>
    </V3Page>
  ),
});
