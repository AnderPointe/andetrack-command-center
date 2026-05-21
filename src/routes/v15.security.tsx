import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V15Page } from "@/components/v15/V15Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/v1/StatTile";
import { V15_SECURITY } from "@/v15/data/mockPhase16";

export const Route = createFileRoute("/v15/security")({
  head: () => ({ meta: [{ title: "V1.5 Security Review · Anderoute" }] }),
  component: Page,
});

function Page() {
  const ok = V15_SECURITY.filter((s) => s.ok).length;
  const total = V15_SECURITY.length;
  const pct = Math.round((ok / total) * 100);
  const areas = Array.from(new Set(V15_SECURITY.map((s) => s.area)));
  return (
    <V15Page
      icon={<ShieldCheck className="size-6 text-cyan-300" />}
      title="V1.5 Security Review"
      blurb="Provider token boundaries, Stripe secrets, webhook signing, RLS scoping for nav sessions and billing, and audit logs for billing and provider changes."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Controls cleared" value={`${ok}/${total}`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Coverage" value={`${pct}%`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Open items" value={total - ok} tone={total - ok ? "warn" : "good"} />
      </div>

      {areas.map((a) => (
        <Card key={a} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold">{a}</h2>
          <div className="mt-3 space-y-2 text-sm">
            {V15_SECURITY.filter((s) => s.area === a).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <div>
                  <div>{s.label}</div>
                  {s.note && <div className="text-xs text-muted-foreground">{s.note}</div>}
                </div>
                <Badge variant="outline" className={s.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                  {s.ok ? "OK" : "Open"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V15Page>
  );
}
