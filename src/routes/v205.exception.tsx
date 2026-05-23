import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useEnterpriseTrustExceptionManagement();
  return <ControlPage icon={<Siren className="size-6 text-teal-300" />} title="Enterprise Trust Exception Management Center" blurb="16 exception categories with owner, risk, SLA, escalation, evidence, remediation, board visibility, outcome." data={d} />;
}
export const Route = createFileRoute("/v205/exception")({ component: Page });
