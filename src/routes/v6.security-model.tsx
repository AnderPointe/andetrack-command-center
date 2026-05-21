import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { V6Page } from "@/components/v6/V6Page";
import { SimpleTable } from "@/components/v6/ui-bits";
import { Card } from "@/components/ui/card";
import { useEnterpriseSecurityOperatingModel } from "@/v6/hooks";

export const Route = createFileRoute("/v6/security-model")({
  head: () => ({ meta: [{ title: "Security Operating Model · V6" }] }),
  component: () => {
    const { functions } = useEnterpriseSecurityOperatingModel();
    return (
      <V6Page icon={<Lock className="size-6 text-emerald-300" />} title="Enterprise Security Operating Model"
        blurb="Access, API key, integration credential and support access governance; incident response; vulnerability management; SDLC (pl); audit logging; retention; vendor risk; customer security requests.">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <SimpleTable rows={functions} columns={[
            { key: "fn",    label: "Function" },
            { key: "owner", label: "Owner" },
            { key: "score", label: "Score" },
          ]} />
        </Card>
      </V6Page>
    );
  },
});
