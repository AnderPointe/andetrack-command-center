import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V75Page } from "@/components/v75/V75Page";
import { SimpleTable, StatusPill, KpiGrid } from "@/components/v75/ui-bits";
import { Card } from "@/components/ui/card";
import { useInternationalPartnerLaunch } from "@/v75/hooks";

export const Route = createFileRoute("/v75/partner-launch")({
  head: () => ({ meta: [{ title: "International Partner Launch · V7.5 · Anderoute" }] }),
  component: () => {
    const { partners, funnel } = useInternationalPartnerLaunch();
    return (
      <V75Page icon={<Plug className="size-6 text-indigo-300" />} title="International Partner Launch Center"
        blurb="10-stage international partner launch pipeline across telematics, carrier network, map, EDI, API, TMS, ERP, accounting, fuel, maintenance, hardware, notification, support.">
        <KpiGrid cols={6} items={funnel.map(f => ({ label: f.stage, value: f.count }))} />

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={partners as any} columns={[
            { key: "partner",  label: "Partner" },
            { key: "category", label: "Category" },
            { key: "stage",    label: "Stage", render: (r: any) => <StatusPill status={r.stage} /> },
            { key: "country",  label: "Country" },
            { key: "risk",     label: "Risk", render: (r: any) => <StatusPill status={r.risk} /> },
            { key: "owner",    label: "Owner" },
          ]} />
        </Card>
      </V75Page>
    );
  },
});
