import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Lock className="size-6 text-emerald-300" />} title="Trust Evidence Lifecycle Governance Center" blurb="Requested → collected → validated → approved → attached → board/customer/partner/external/data-room use → archived → expired → refreshed. 13 evidence domains." data={H.useTrustEvidenceLifecycleGovernance()} />; }
export const Route = createFileRoute("/v22/evidence")({ component: Page });
