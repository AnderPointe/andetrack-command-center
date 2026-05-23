import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<AlertTriangle className="size-6 text-emerald-300" />} title="Trust Risk Lifecycle Governance Center" blurb="Signal → owner → evidence → score → mitigation → approval → execution → outcome → recurrence → board visibility → closed. 15 categories." data={H.useTrustRiskLifecycleGovernance()} />; }
export const Route = createFileRoute("/v22/risk")({ component: Page });
