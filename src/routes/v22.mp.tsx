import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Megaphone className="size-6 text-emerald-300" />} title="Marketplace Trust Lifecycle Optimization Center" blurb="Carrier readiness, onboarding, quality, compliance, load/bid/lane/regional/equipment, dispute, preferred-carrier recommendation — HITL on award + dispute + preferred." data={H.useMarketplaceTrustLifecycleOptimization()} />; }
export const Route = createFileRoute("/v22/mp")({ component: Page });
