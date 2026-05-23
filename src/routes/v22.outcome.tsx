import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Radar className="size-6 text-emerald-300" />} title="Outcome Lifecycle Trust Governance Center" blurb="Approved / rejected / automation outcomes per domain · confidence calibration · policy tuning · lessons learned · board visibility." data={H.useOutcomeLifecycleTrustGovernance()} />; }
export const Route = createFileRoute("/v22/outcome")({ component: Page });
