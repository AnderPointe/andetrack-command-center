import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/partners-intel")({
  component: () => <IntelAreaPage icon={<Network className="size-6 text-fuchsia-300" />}
    title="Partner Ecosystem Intelligence" blurb="Partner tiers ranked by realized contribution, outcome-weighted." match="Partner intel" />,
});
