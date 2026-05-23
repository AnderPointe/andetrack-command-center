import { createFileRoute } from "@tanstack/react-router";
import { Siren } from "lucide-react";
import { ControlPage } from "@/components/v22/ControlPage";
import * as H from "@/v22/hooks";
function Page() { return <ControlPage icon={<Siren className="size-6 text-emerald-300" />} title="Enterprise Trust Lifecycle Exception Management Center" blurb="18 exception categories spanning operating, customer/partner automation, board execution, revenue, MP, evidence, boundaries, approval, rec, outcome, audit, risk, capital, product, category, tenant." data={H.useEnterpriseTrustLifecycleExceptions()} />; }
export const Route = createFileRoute("/v22/exception")({ component: Page });
