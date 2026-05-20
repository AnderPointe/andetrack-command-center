import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { V11_SECURITY_REVIEW } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/security")({
  head: () => ({ meta: [{ title: "V1.1 Security Review · Anderoute" }] }),
  component: Page,
});

function Page() {
  const ok = V11_SECURITY_REVIEW.filter((s) => s.ok).length;
  const open = V11_SECURITY_REVIEW.length - ok;
  const pct = Math.round((ok / V11_SECURITY_REVIEW.length) * 100);
  return (
    <V11Page
      icon={<ShieldCheck className="size-6 text-fuchsia-300" />}
      title="V1.1 Security Review"
      blurb="RLS coverage on new billing/import tables, CSV input validation, file upload limits, Stripe secret isolation, audit logging."
    >
      <div className="grid gap-3 md:grid-cols-3">
        <StatTile label="Controls cleared" value={`${ok}/${V11_SECURITY_REVIEW.length}`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Coverage" value={`${pct}%`} tone={pct >= 90 ? "good" : "warn"} />
        <StatTile label="Open items" value={open} tone={open ? "warn" : "good"} />
      </div>
      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Review checklist</h2>
        <div className="mt-3 space-y-2 text-sm">
          {V11_SECURITY_REVIEW.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span>{s.label}</span>
              <Badge variant="outline" className={s.ok ? "border-emerald-500/30 text-emerald-300" : "border-amber-500/30 text-amber-300"}>
                {s.ok ? "OK" : "Open"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </V11Page>
  );
}
