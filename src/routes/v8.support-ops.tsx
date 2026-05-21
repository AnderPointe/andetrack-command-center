import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { V8Page } from "@/components/v8/V8Page";
import { SimpleTable } from "@/components/v8/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalSupportOperations } from "@/v8/hooks";

export const Route = createFileRoute("/v8/support-ops")({
  head: () => ({ meta: [{ title: "International Support Operations · Anderoute" }] }),
  component: () => {
    const { regions, volume } = useInternationalSupportOperations();
    return (
      <V8Page icon={<LifeBuoy className="size-6 text-violet-300" />} title="International Support Operations"
        blurb="Regional coverage, time-zone & language readiness placeholders, SLA compliance, escalations, critical incidents, and KB coverage.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Regional coverage</h3>
          <SimpleTable rows={regions as any} columns={[
            { key: "region",   label: "Region" },
            { key: "timezone", label: "TZ" },
            { key: "language", label: "Language" },
            { key: "sla",      label: "SLA %" },
            { key: "escalations", label: "Esc" },
            { key: "critical",    label: "Critical" },
            { key: "kb",          label: "KB" },
          ]} />
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Support volume by surface (7d)</h3>
          <SimpleTable rows={volume as any} columns={[
            { key: "surface", label: "Surface" },
            { key: "volume",  label: "Volume" },
          ]} />
        </Card>
      </V8Page>
    );
  },
});
