import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<TrendingUp className="size-6 text-emerald-300" />} title="Revenue Trust Lifecycle Systems Center" blurb="Renewal, expansion, churn, concentration, payment, dispute, MP/API/EDI/partner revenue — evidence + approval + audit across the lifecycle." data={H.useRevenueTrustLifecycleSystems()} />; }
export const Route = createFileRoute("/v22/revenue")({ component: Page });
