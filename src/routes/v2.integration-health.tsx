import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { V2Page } from "@/components/v2/V2Page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROVIDER_HEALTH, PROVIDER_TREND_24H } from "@/v2/data/mockPhase17";

function MiniSpark({ data }: { data: number[] }) {
  const min = Math.min(...data), max = Math.max(...data);
  const w = 120, h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke="hsl(265 90% 70%)" strokeWidth="1.5" points={pts} />
    </svg>
  );
}

export const Route = createFileRoute("/v2/integration-health")({
  head: () => ({ meta: [{ title: "Integration Health · Anderoute" }] }),
  component: Page,
});

const stTone: Record<string, string> = {
  ok: "border-emerald-500/30 text-emerald-300",
  degraded: "border-amber-500/30 text-amber-300",
  down: "border-rose-500/30 text-rose-300",
};

function Page() {
  const cats = Array.from(new Set(PROVIDER_HEALTH.map((p) => p.category)));
  return (
    <V2Page
      icon={<Activity className="size-6 text-violet-300" />}
      title="Integration Health Dashboard V2"
      blurb="Navigation, billing, webhooks, EDI, email, SMS, AI, and customer portal — one place to see what's degraded, what's down, and how it's trending."
    >
      {cats.map((cat) => (
        <Card key={cat} className="border-white/10 bg-white/[0.02] p-4">
          <h2 className="text-sm font-semibold capitalize">{cat}</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {PROVIDER_HEALTH.filter((p) => p.category === cat).map((p) => (
              <div key={p.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{p.name}</div>
                  <Badge variant="outline" className={stTone[p.status]}>{p.status}</Badge>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-x-3 text-xs text-muted-foreground">
                  <div>p95: {p.p95Ms}ms</div>
                  <div>errors: {p.errorPct}%</div>
                </div>
                {p.note && <div className="mt-1 text-xs text-muted-foreground">{p.note}</div>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </V2Page>
  );
}
