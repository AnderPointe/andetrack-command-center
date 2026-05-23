import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.usePredictiveTrustRiskMaturity();
  return <ControlPage icon={<AlertTriangle className="size-6 text-teal-300" />} title="Predictive Trust Risk Maturity Center" blurb="15 risk categories with signal/owner/evidence/escalation/mitigation/recurrence/outcome trust maturity." data={d} />;
}
export const Route = createFileRoute("/v205/risk")({ component: Page });
