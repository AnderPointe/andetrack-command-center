import { createFileRoute } from "@tanstack/react-router";
import { ServerCog } from "lucide-react";
import { V95Page } from "@/components/v95/V95Page";
import { Card } from "@/components/ui/card";
import { ScoreCard, SimpleTable, StatusPill } from "@/components/v95/ui-bits";
import * as H from "@/v95/hooks";

function Page() {
  const s = H.useSupportReliabilityTrust();
  return (
    <V95Page icon={<ServerCog className="size-6 text-cyan-300" />} title="Global Support and Reliability Trust" blurb="Reliability trust, support trust, incident timeline, SLA compliance, support burden by segment, reliability action tracker.">
      <div className="grid gap-3 md:grid-cols-4">
        <ScoreCard label="Reliability"    value={s.reliability.score} tone="emerald" />
        <ScoreCard label="Support trust"  value={s.support.score} tone="sky" />
        <ScoreCard label="SLA compliance" value={s.reliability.sla_compliance} tone="violet" />
        <ScoreCard label="Critical (30d)" value={s.reliability.critical_30d} tone="rose" />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Incident timeline</h3>
        <div className="mt-2">
          <SimpleTable rows={s.incidents as any} columns={[
            { key: "at", label: "Date" }, { key: "area", label: "Area" },
            { key: "severity", label: "Severity", render: (r: any) => <StatusPill status={r.severity} /> },
            { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status} /> },
          ]} />
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h3 className="text-sm font-semibold">Support burden by segment</h3>
        <div className="mt-2">
          <SimpleTable rows={s.burden as any} columns={[
            { key: "segment", label: "Segment" },
            { key: "tickets", label: "Tickets (30d)" },
            { key: "trend", label: "Trend" },
          ]} />
        </div>
      </Card>
    </V95Page>
  );
}

export const Route = createFileRoute("/v95/support")({
  head: () => ({ meta: [{ title: "Support & Reliability · Anderoute V9.5" }] }),
  component: Page,
});
