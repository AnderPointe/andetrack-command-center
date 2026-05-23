import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useOutcomeTrustMaturity();
  return <ControlPage icon={<Radar className="size-6 text-teal-300" />} title="Outcome Trust Maturity Center" blurb="Approved/rejected, automation, revenue, MP, capital, customer, partner, product, category outcome trust." data={d} />;
}
export const Route = createFileRoute("/v205/outcome")({ component: Page });
