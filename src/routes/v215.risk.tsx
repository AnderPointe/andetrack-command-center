import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<AlertTriangle className="size-6 text-emerald-300" />}
    title="Trust Risk Network Governance Center"
    blurb="15 risk categories with owner/evidence/coverage — revenue, customer, MP, carrier, partner, product, category, capital, board, evidence, audit, AI, compliance, tenant, scalability."
    data={H.useTrustRiskNetworkGovernance()} />;
}
export const Route = createFileRoute("/v215/risk")({ component: Page });
