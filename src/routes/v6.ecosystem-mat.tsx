import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCustomerPartnerEcosystemMaturity } from "@/v6/hooks";

export const Route = createFileRoute("/v6/ecosystem-mat")({
  head: () => ({ meta: [{ title: "Customer/Partner Maturity · V6" }] }),
  component: () => {
    const { areas, opps } = useCustomerPartnerEcosystemMaturity();
    return (
      <V6Page icon={<Users className="size-6 text-emerald-300" />} title="Customer and Partner Ecosystem Maturity"
        blurb="Enterprise customers, success, support, partner ecosystem, carrier network, API/EDI/telematics/marketplace/strategic partners, joint opportunities and partner-driven revenue (placeholder).">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Maturity</h3>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {areas.map(a => (
              <div key={a.area}>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">{a.area}</span><span className={a.score >= 85 ? "text-emerald-300" : a.score >= 78 ? "text-sky-300" : "text-amber-300"}>{a.score}</span></div>
                <Progress value={a.score} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold">Joint customer opportunities</h3>
          <div className="mt-2">
            <SimpleTable rows={opps} columns={[
              { key: "partner", label: "Partner" },
              { key: "account", label: "Account" },
              { key: "arr_pl",  label: "ARR uplift ($M, pl)" },
              { key: "status",  label: "Status" },
            ]} />
          </div>
        </Card>
      </V6Page>
    );
  },
});
