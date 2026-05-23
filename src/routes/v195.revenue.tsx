import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ControlPage } from "@/components/v195/ControlPage";
import * as H from "@/v195/hooks";

function Page() {
  return <ControlPage icon={<TrendingUp className="size-6 text-violet-300" />}
    title="Revenue Assurance Optimization Center"
    blurb="Renewal · expansion · churn · concentration · payment · billing · MP · API/EDI · partner revenue assurance optimization."
    data={H.useRevenueAssuranceOptimization()} scoreLabel="Revenue optimization" />;
}
export const Route = createFileRoute("/v195/revenue")({ component: Page });
