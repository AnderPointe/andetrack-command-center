import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Network className="size-6 text-emerald-300" />} title="Enterprise Trust Lifecycle Operating System" blurb="21 lifecycle domains under one operating score. HITL on every high-impact action." data={H.useEnterpriseTrustLifecycleOperating()} />; }
export const Route = createFileRoute("/v22/operating")({ component: Page });
