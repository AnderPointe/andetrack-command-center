import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/product-intel")({
  component: () => <IntelAreaPage icon={<Boxes className="size-6 text-fuchsia-300" />}
    title="Product-Line Intelligence Governance" blurb="Monthly product-line P&L recs reviewed by GMs before action." match="Product intel" />,
});
