import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<TrendingUp className="size-6 text-violet-300" />}
    title="Durable Revenue Control Assurance Center"
    blurb="Renewal/expansion/churn/concentration/payment/billing/MP/API/EDI/partner revenue controls with evidence, approval, audit."
    scoreLabel="Revenue control assurance"
    data={H.useDurableRevenueControlAssurance()} />;
}
export const Route = createFileRoute("/v19/revenue")({ component: Page });
