import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V55Page } from "@/components/v55/V55Page";
import { KpiGrid } from "@/components/v55/ui-bits";
import { Card } from "@/components/ui/card";
import { usePlatformReliabilityLeadership, useReliabilityTrend } from "@/v55/hooks";

export const Route = createFileRoute("/v55/reliability")({
  head: () => ({ meta: [{ title: "Reliability · Anderoute V5.5" }] }),
  component: () => {
    const { metrics } = usePlatformReliabilityLeadership();
    const { trend } = useReliabilityTrend();
    return (
      <V55Page icon={<Activity className="size-6 text-amber-300" />} title="Platform Reliability Leadership View"
        blurb="Uptime, latency, GPS, webhook, EDI, mobile crash-free, notification delivery, route/billing provider reliability and incident metrics. Uptime is placeholder.">
        <KpiGrid cols={4} items={[
          { label: "Uptime (placeholder)",   value: `${metrics.uptime_pct}%` },
          { label: "API p95",                value: `${metrics.api_p95_ms}ms` },
          { label: "Realtime p95",           value: `${metrics.realtime_p95_ms}ms` },
          { label: "GPS reliability",        value: `${metrics.gps_reliability_pct}%` },
          { label: "Webhook delivery",       value: `${metrics.webhook_pct}%` },
          { label: "EDI delivery",           value: `${metrics.edi_pct}%` },
          { label: "Mobile crash-free (ph)", value: `${metrics.mobile_crash_free_pct}%` },
          { label: "Notification delivery",  value: `${metrics.notification_pct}%` },
          { label: "Route provider",         value: `${metrics.route_provider_pct}%` },
          { label: "Billing provider",       value: `${metrics.billing_provider_pct}%` },
          { label: "Support incident rate",  value: metrics.support_incident_rate },
          { label: "Critical incidents",     value: metrics.critical_incidents },
        ]} />
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Uptime · latency trend (weekly)</h3>
          <div className="mt-3 space-y-2 text-xs">
            {trend.map(t => (
              <div key={t.d} className="grid grid-cols-[40px_1fr_80px_80px] items-center gap-2">
                <span className="text-muted-foreground">{t.d}</span>
                <div className="h-2 rounded bg-white/5">
                  <div className="h-full rounded bg-emerald-400/70" style={{ width: `${(t.uptime - 99.8) / 0.2 * 100}%` }} />
                </div>
                <span className="text-emerald-300">{t.uptime}%</span>
                <span className="text-sky-300">p95 {t.p95}ms</span>
              </div>
            ))}
          </div>
        </Card>
      </V55Page>
    );
  },
});
