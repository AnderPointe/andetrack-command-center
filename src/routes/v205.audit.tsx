import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useTrustAuditMaturity();
  return <ControlPage icon={<FileSearch className="size-6 text-teal-300" />} title="Trust Audit Maturity Center" blurb="Audit schedule, owner coverage, evidence, finding reduction, remediation, board-visible findings, export readiness." data={d} />;
}
export const Route = createFileRoute("/v205/audit")({ component: Page });
