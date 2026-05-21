import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTEGRATIONS } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/integrations")({
  head: () => ({ meta: [{ title: "V1.5 Integrations · Anderoute" }] }),
  component: Page,
});

const tone: Record<string, string> = {
  connected:    "border-emerald-500/30 text-emerald-300",
  needs_config: "border-amber-500/30 text-amber-300",
  disabled:     "border-white/15 text-muted-foreground",
};

function Page() {
  return (
    <V15Page
      icon={<Plug className="size-6 text-cyan-300" />}
      title="Basic Integrations Starter"
      blurb="Webhook, email, SMS, map, and billing provider settings. A purposeful starter — full marketplace is V2."
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Connected integrations</h2>
        <div className="mt-3 space-y-2 text-sm">
          {INTEGRATIONS.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{i.type}</span> · {i.provider}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-xs text-muted-foreground">{i.lastSync}</Badge>
                <Badge variant="outline" className={tone[i.status]}>{i.status.replace("_", " ")}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Schema</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>company_integrations — type, provider, status, config, last_sync_at</li>
          <li>webhook_endpoints — url, secret_hash, event_types, enabled</li>
          <li>webhook_deliveries — payload, status, response_code, attempt_count</li>
        </ul>
      </Card>
    </V15Page>
  );
}
