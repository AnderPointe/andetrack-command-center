import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid, SimpleTable, StatusPill } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { usePlatformReliabilityMaturity } from "@/v6/hooks";

export const Route = createFileRoute("/v6/reliability")({
  head: () => ({ meta: [{ title: "Reliability · V6" }] }),
  component: () => {
    const { metrics: m, trend, postmortems } = usePlatformReliabilityMaturity();
    return (
      <V6Page icon={<Activity className="size-6 text-emerald-300" />} title="Platform Reliability Maturity"
        blurb="Uptime (placeholder), latencies, GPS / route / notification / webhook / EDI / billing reliability, mobile crash-free (placeholder), incident rate, error budget, postmortems and action plans.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Uptime (pl)" value={Math.round(m.uptime_pl * 100) / 100} tone="emerald" />
          <ScoreCard label="GPS reliability" value={m.gps_reliability} tone="sky" />
          <ScoreCard label="EDI reliability" value={m.edi_reliability} tone="violet" />
          <ScoreCard label="Error budget left (pl)" value={m.error_budget_remaining_pl} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "API p95", value: `${m.api_latency_p95_ms}ms` },
          { label: "Realtime p95", value: `${m.rt_latency_p95_ms}ms` },
          { label: "Webhook delivery", value: `${m.webhook_delivery}%` },
          { label: "Notification delivery", value: `${m.notification_delivery}%` },
          { label: "Mobile crash-free (pl)", value: `${m.mobile_crash_free_pl}%` },
          { label: "Support rate", value: `${m.support_rate}` },
          { label: "Critical incidents 30d", value: m.critical_incidents_30d },
          { label: "Billing provider", value: `${m.billing_provider}%` },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Uptime trend</h3>
          <div className="mt-3 space-y-2 text-xs">
            {trend.map(t => (
              <div key={t.w} className="grid grid-cols-[40px_1fr_60px] items-center gap-2">
                <span className="text-muted-foreground">{t.w}</span>
                <div className="h-2 rounded bg-white/5"><div className="h-full rounded bg-emerald-400/70" style={{ width: `${(t.uptime - 99.9) * 1000}%` }} /></div>
                <span>{t.uptime}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Incident postmortems</h3>
          <div className="mt-2">
            <SimpleTable rows={postmortems} columns={[
              { key: "date",     label: "Date" },
              { key: "title",    label: "Title" },
              { key: "severity", label: "Severity", render: (r) => <StatusPill status={r.severity} /> },
              { key: "status",   label: "Status",   render: (r) => <StatusPill status={r.status} /> },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
