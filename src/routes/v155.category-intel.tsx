import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { IntelAreaPage } from "@/components/v155/IntelAreaPage";
export const Route = createFileRoute("/v155/category-intel")({
  component: () => <IntelAreaPage icon={<Star className="size-6 text-fuchsia-300" />}
    title="Category Leadership Intelligence" blurb="Share + leadership index trend with mention/win-rate signals." match="Category intel" />,
});
