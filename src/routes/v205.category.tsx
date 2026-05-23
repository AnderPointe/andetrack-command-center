import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { ControlPage } from "@/components/v205/ControlPage";
import * as H from "@/v205/hooks";

function Page() {
  const d = H.useCategoryTrustMaturity();
  return <ControlPage icon={<Megaphone className="size-6 text-teal-300" />} title="Category Trust Maturity Center" blurb="Narrative, proof, market education, competitive positioning, sales/board narrative, publishing approval trust." data={d} />;
}
export const Route = createFileRoute("/v205/category")({ component: Page });
