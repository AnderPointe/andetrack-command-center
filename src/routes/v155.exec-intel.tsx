import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/exec-intel")({
  component: () => <IntelAreaPage icon={<Briefcase className="size-6 text-fuchsia-300" />}
    title="Executive Intelligence Workflows" blurb="One weekly exec briefing — recs from capital + revenue + MP, all human-approved." match="Executive intel" />,
});
