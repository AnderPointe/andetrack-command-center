import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Briefcase className="size-6 text-emerald-300" />} title="Executive Lifecycle Trust Command Center" blurb="CEO/CFO/COO/CRO/MP/Product/CS/Partner/Security lifecycle queues, high-risk items, overdue approvals, escalations, board decisions, outcomes." data={H.useExecutiveLifecycleTrustCommand()} />; }
export const Route = createFileRoute("/v22/exec")({ component: Page });
