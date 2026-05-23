import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useExecutiveTrustAssurance();
  return <ControlPage icon={<Briefcase className="size-6 text-teal-300" />} title="Executive Trust Assurance Center" blurb="CEO/CFO/COO/CRO/MP/Product/CS/Partner/Security executive trust assurance queues and escalations." data={d} />;
}
export const Route = createFileRoute("/v205/exec")({ component: Page });
