import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable, StatusPill } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const scope = H.useV155Scope();
  return (
    <V155Page icon={<Layers className="size-6 text-fuchsia-300" />}
      title="V15.5 Scope" blurb="What's in V15.5 and what stays deferred.">
      <Section title="Scope">
        <SimpleTable rows={scope as any} columns={[
          { key: "area", label: "Area" },
          { key: "status", label: "Status", render: (r: any) => <StatusPill status={r.status === "in_progress" ? "in_progress" : r.status === "deferred" ? "watchlist" : "healthy"} /> },
          { key: "note", label: "Note" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/scope")({ component: Page });
