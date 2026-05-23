import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { V155Page } from "@/components/v155/V155Page";
import { Section, SimpleTable } from "@/components/v155/ui-bits";
import * as H from "@/v155/hooks";

function Page() {
  const d = H.useV155Demo();
  const edge = H.useV155EdgeBoundary();
  return (
    <V155Page icon={<ListChecks className="size-6 text-fuchsia-300" />}
      title="V15.5 Demo Flow"
      blurb="10-step persona walkthrough — CEO, CFO, CRO, MP GM, Risk, FP&A, Chief of Staff, Board. Ends with autonomy posture re-confirmed.">
      <Section title="Demo steps">
        <SimpleTable rows={d as any} columns={[
          { key: "step", label: "#" }, { key: "actor", label: "Actor" },
          { key: "surface", label: "Surface" }, { key: "action", label: "Action" },
          { key: "outcome", label: "Outcome" },
        ]} />
      </Section>
      <Section title="ServerFn vs /api/public vs Edge boundary">
        <SimpleTable rows={edge as any} columns={[
          { key: "layer", label: "Layer" }, { key: "concern", label: "Concern" },
          { key: "auth", label: "Auth" }, { key: "returns", label: "Returns" },
        ]} />
      </Section>
    </V155Page>
  );
}
export const Route = createFileRoute("/v155/demo")({ component: Page });
