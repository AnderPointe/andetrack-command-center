import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Partner Lifecycle Boundary Controls Center" blurb="Partner data boundary, portal exposure, comms/proof approval, joint customer visibility, integration boundary, tenant isolation, external-use approval." data={H.usePartnerLifecycleBoundaryControls()} />; }
export const Route = createFileRoute("/v22/part-boundary")({ component: Page });
