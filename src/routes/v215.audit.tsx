import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<FileSearch className="size-6 text-emerald-300" />}
    title="Trust Audit Network Maturity Center"
    blurb="Schedule, owner coverage, evidence completeness, finding reduction, remediation speed, board-visible findings, audit readiness/export across 15 audit areas."
    data={H.useTrustAuditNetworkMaturity()} />;
}
export const Route = createFileRoute("/v215/audit")({ component: Page });
