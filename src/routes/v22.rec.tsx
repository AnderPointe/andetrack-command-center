import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<CheckCircle2 className="size-6 text-emerald-300" />} title="Recommendation Lifecycle Trust Governance Center" blurb="Signal → rec → explanation → evidence → risk → confidence → approver → approval → action → outcome → lesson → policy tuning → evidence updated." data={H.useRecommendationLifecycleTrustGovernance()} />; }
export const Route = createFileRoute("/v22/rec")({ component: Page });
