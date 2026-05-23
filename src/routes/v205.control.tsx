import { createFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useTrustControlScale();
  return <ControlPage icon={<Settings2 className="size-6 text-teal-300" />} title="Trust Control Scale Center" blurb="Control maturity, owner coverage, evidence freshness, testing, exception rate, audit readiness, scalability risk." data={d} />;
}
export const Route = createFileRoute("/v205/control")({ component: Page });
