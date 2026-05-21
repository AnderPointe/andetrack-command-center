import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useGlobalSupportReadiness } from "@/v75/hooks";

export const Route = createFileRoute("/v75/support")({
  head: () => ({ meta: [{ title: "Global Support Readiness · V7.5 · Anderoute" }] }),
  component: () => {
    const { regions } = useGlobalSupportReadiness();
    return (
      <V75Page icon={<LifeBuoy className="size-6 text-indigo-300" />} title="Global Support Readiness Execution"
        blurb="Hours, timezone, language, escalation, critical incident, driver/customer/marketplace/API/partner support, SLA, staffing — by region.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={regions as any} columns={[
            { key: "region",      label: "Region" },
            { key: "hours",       label: "Hours" },
            { key: "tz",          label: "Timezone" },
            { key: "language",    label: "Language" },
            { key: "escalation",  label: "Escalation", render: (r: any) => <StatusPill status={r.escalation} /> },
            { key: "critical",    label: "Critical", render: (r: any) => <StatusPill status={r.critical} /> },
            { key: "driver",      label: "Driver", render: (r: any) => <StatusPill status={r.driver} /> },
            { key: "customer",    label: "Customer", render: (r: any) => <StatusPill status={r.customer} /> },
            { key: "staffing",    label: "Staffing", render: (r: any) => <StatusPill status={r.staffing} /> },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
