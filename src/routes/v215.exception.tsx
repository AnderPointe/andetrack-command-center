import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Siren className="size-6 text-emerald-300" />}
    title="Enterprise Trust Lifecycle Exception Center"
    blurb="18 exception categories spanning network, customer/partner lifecycle, board maturity, revenue, MP, evidence, boundaries, audit, approval/rec/outcome, risk, capital, product, category, tenant boundary."
    data={H.useEnterpriseTrustLifecycleExceptions()} />;
}
export const Route = createFileRoute("/v215/exception")({ component: Page });
