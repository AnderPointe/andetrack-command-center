import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/accounts-intel")({
  component: () => <IntelAreaPage icon={<Users className="size-6 text-fuchsia-300" />}
    title="Strategic Account Intelligence" blurb="Top-50 accounts get personalized renewal recs with mandatory explainability." match="Account intel" />,
});
