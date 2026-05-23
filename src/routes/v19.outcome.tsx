import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ControlPage } from "@/components/v19/ControlPage";
import * as H from "@/v19/hooks";

function Page() {
  return <ControlPage icon={<Radar className="size-6 text-violet-300" />}
    title="Outcome Assurance Maturity Center"
    blurb="Outcomes across recs, automation, approvals, revenue, MP, capital, accounts, partners, products, category, lessons, board visibility."
    scoreLabel="Outcome maturity"
    data={H.useOutcomeAssuranceMaturity()} />;
}
export const Route = createFileRoute("/v19/outcome")({ component: Page });
