import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V1Page } from "@/components/v1/V1Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SECURITY_REVIEW } from "@/v1/data/mockPhase14";

export const Route = createFileRoute("/v1/security")({
  head: () => ({ meta: [{ title: "V1 Security Review · Anderoute" }] }),
  component: Page,
});

function Page() {
  const ok = SECURITY_REVIEW.filter((s) => s.ok).length;
  return (
    <V1Page
      icon={<ShieldCheck className="size-6 text-indigo-300" />}
      title="V1 Security Review"
      blurb={`${ok}/${SECURITY_REVIEW.length} controls cleared. RLS, role gating, storage, secrets, audit logging.`}
    >
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="space-y-2">
          {SECURITY_REVIEW.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <div>
                <div>{s.label}</div>
                {"note" in s && (s as { note?: string }).note && (
                  <div className="text-xs text-muted-foreground">{(s as { note?: string }).note}</div>
                )}
              </div>
              <Badge variant="outline" className={s.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {s.ok ? "OK" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V1Page>
  );
}
