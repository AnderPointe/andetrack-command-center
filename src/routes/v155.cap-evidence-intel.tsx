import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/cap-evidence-intel")({
  component: () => <IntelAreaPage icon={<Lock className="size-6 text-fuchsia-300" />}
    title="Capital Evidence Intelligence" blurb="Capital evidence pack auto-bundles supporting approved recs for audit + lender review." match="Cap evidence" />,
});
