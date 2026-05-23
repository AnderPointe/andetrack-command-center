import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/risk-intel")({
  component: () => <IntelAreaPage icon={<AlertTriangle className="size-6 text-fuchsia-300" />}
    title="Strategic Risk Intelligence Maturity" blurb="Bias / drift monitor on every recommendation. Auto-defer on drift > 0.2." match="Risk intel" />,
});
