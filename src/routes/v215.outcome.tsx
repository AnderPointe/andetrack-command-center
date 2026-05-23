import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v215/ControlPage";
import * as H from "@/v215/hooks";
function Page() {
  return <ControlPage icon={<Radar className="size-6 text-emerald-300" />}
    title="Outcome Trust Lifecycle Intelligence Center"
    blurb="Approved / rejected / automation outcomes per domain · confidence calibration · policy tuning · lessons captured · board visibility."
    data={H.useOutcomeTrustLifecycle()} />;
}
export const Route = createFileRoute("/v215/outcome")({ component: Page });
