import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V25Page } from "@/components/v25/V25Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RELIABILITY_TRACKERS, RETRY_BACKLOG, CREDENTIAL_EXPIRATION } from "@/v25/data/mockPhase18";

const tone: Record<string, string> = { good: "border-emerald-500/30 text-emerald-300", warn: "border-amber-500/30 text-amber-300", bad: "border-rose-500/30 text-rose-300", info: "border-sky-500/30 text-sky-300" };

export const Route = createFileRoute("/v25/integration-reliability")({
  head: () => ({ meta: [{ title: "Integration Reliability · Anderoute" }] }),
  component: () => (
    <V25Page icon={<Activity className="size-6 text-emerald-300" />} title="Integration Reliability V2.5" blurb="SLA tracking across EDI, webhooks, API, billing, map, notifications, and customer comms. Retry backlog and credential expiration surface here.">
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">SLA tracking (30d)</h2>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="p-2">Area</th><th className="p-2">Current</th><th className="p-2">SLA</th><th className="p-2">Incidents</th></tr></thead>
          <tbody>
            {RELIABILITY_TRACKERS.map((t) => (
              <tr key={t.id} className="border-t border-white/10"><td className="p-2">{t.area}</td><td className="p-2"><Badge variant="outline" className={tone[t.status]}>{t.current}%</Badge></td><td className="p-2 font-mono text-xs">{t.sla}</td><td className="p-2 font-mono text-xs">{t.incidents30d}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Retry backlog</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {RETRY_BACKLOG.map((b) => (
              <li key={b.id} className="rounded border border-white/10 bg-black/20 p-2"><div className="flex items-center justify-between"><div className="font-medium">{b.system}</div><span className="text-xs text-muted-foreground">attempt {b.attempts}</span></div><div className="mt-1 text-xs text-muted-foreground">{b.reason} · next {b.nextRetry}</div></li>
            ))}
          </ul>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">Credential expiration</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {CREDENTIAL_EXPIRATION.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-2"><span>{c.credential}</span><Badge variant="outline" className={tone[c.severity]}>{c.expiresIn}</Badge></li>
            ))}
          </ul>
        </Card>
      </div>
    </V25Page>
  ),
});
