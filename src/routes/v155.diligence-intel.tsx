import { createFileRoute } from "@tanstack/react-router";
import { Stamp } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/diligence-intel")({
  component: () => <IntelAreaPage icon={<Stamp className="size-6 text-fuchsia-300" />}
    title="Commercial Diligence Intelligence" blurb="Diligence drafts source only from approved recs — never raw model output." match="Diligence intel" />,
});
