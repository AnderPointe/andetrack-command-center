import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { ScoreCard, KpiGrid } from "@/components/v6/ui-bits";
import { useEnterpriseEcosystemScale } from "@/v6/hooks";

export const Route = createFileRoute("/v6/ecosystem")({
  head: () => ({ meta: [{ title: "Ecosystem Scale · V6" }] }),
  component: () => {
    const { scale: s } = useEnterpriseEcosystemScale();
    return (
      <V6Page icon={<Boxes className="size-6 text-emerald-300" />} title="Enterprise Ecosystem Scale Dashboard"
        blurb="Companies, enterprise accounts, dispatchers, drivers, vehicles, carriers, customers, partner integrations and regional/product-line scale.">
        <div className="grid gap-3 md:grid-cols-4">
          <ScoreCard label="Scale score" value={s.score} tone="emerald" />
          <ScoreCard label="Enterprise mix" value={Math.round((s.enterprise_accts/s.companies)*100)} tone="sky" />
          <ScoreCard label="Partner depth" value={Math.min(100, s.partner_integrations*1.5)} tone="violet" />
          <ScoreCard label="Implementation throughput" value={84} tone="amber" />
        </div>
        <KpiGrid cols={4} items={[
          { label: "Companies", value: s.companies },
          { label: "Enterprise accts", value: s.enterprise_accts },
          { label: "Dispatchers", value: s.dispatchers.toLocaleString() },
          { label: "Drivers", value: s.drivers.toLocaleString() },
          { label: "Vehicles", value: s.vehicles.toLocaleString() },
          { label: "Carriers", value: s.carriers.toLocaleString() },
          { label: "Customers", value: s.customers.toLocaleString() },
          { label: "Partner integrations", value: s.partner_integrations },
          { label: "API partners", value: s.api_partners },
          { label: "EDI partners", value: s.edi_partners },
          { label: "Telematics partners", value: s.telematics_partners },
          { label: "Strategic partners", value: s.strategic_partners },
        ]} />
      </V6Page>
    );
  },
});
