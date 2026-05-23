import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useCapitalTrustReadiness();
  return <ControlPage icon={<Wallet className="size-6 text-teal-300" />} title="Capital Trust Readiness Center" blurb="Data room, investor/acquirer, board capital, revenue durability, MP, risk evidence, external-use approval." data={d} />;
}
export const Route = createFileRoute("/v205/capital")({ component: Page });
