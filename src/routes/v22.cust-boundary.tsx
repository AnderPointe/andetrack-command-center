import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<ShieldCheck className="size-6 text-emerald-300" />} title="Customer Lifecycle Boundary Controls Center" blurb="Customer data boundary, portal exposure, comms/proof approval, support data, account visibility, tenant isolation, external-use approval." data={H.useCustomerLifecycleBoundaryControls()} />; }
export const Route = createFileRoute("/v22/cust-boundary")({ component: Page });
