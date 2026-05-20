import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { V11Page } from "@/components/v11/V11Page";
import { StatTile } from "@/components/v1/StatTile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ETA_SHIPMENTS, ETA_UPDATE_TIMELINE, explainETAChange, etaConfidenceReasons } from "@/v11/data/mockPhase15";

export const Route = createFileRoute("/v11/eta")({
  head: () => ({ meta: [{ title: "V1.1 ETA Engine · Anderoute" }] }),
  component: Page,
});

const windowTone = {
  on_track: "border-emerald-500/30 text-emerald-300",
  watch:    "border-sky-500/30 text-sky-300",
  at_risk:  "border-amber-500/30 text-amber-300",
  late:     "border-rose-500/30 text-rose-300",
} as const;

const confTone = {
  high:   "border-emerald-500/30 text-emerald-300",
  medium: "border-sky-500/30 text-sky-300",
  low:    "border-amber-500/30 text-amber-300",
  stale:  "border-rose-500/30 text-rose-300",
} as const;

const reasonTone: Record<string, string> = {
  good: "border-emerald-500/30 text-emerald-300",
  info: "border-sky-500/30 text-sky-300",
  warn: "border-amber-500/30 text-amber-300",
  bad:  "border-rose-500/30 text-rose-300",
  default: "border-white/15 text-muted-foreground",
};

function Page() {
  const late = ETA_SHIPMENTS.filter((s) => s.status === "late").length;
  const atRisk = ETA_SHIPMENTS.filter((s) => s.status === "at_risk").length;
  const stale = ETA_SHIPMENTS.filter((s) => s.confidence === "stale").length;
  const avgRisk = Math.round(
    ETA_SHIPMENTS.reduce((acc, s) => acc + s.delayRiskPct, 0) / ETA_SHIPMENTS.length
  );
  return (
    <V11Page
      icon={<Clock className="size-6 text-fuchsia-300" />}
      title="Improved ETA Engine"
      blurb="Rules-based ETA: distance + vehicle speed + GPS freshness + dwell + dispatcher buffer + delivery window. Confidence is explained on every shipment so dispatchers can act, not guess."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <StatTile label="Tracked shipments" value={ETA_SHIPMENTS.length} tone="info" />
        <StatTile label="At risk" value={atRisk} tone={atRisk ? "warn" : "good"} />
        <StatTile label="Late" value={late} tone={late ? "bad" : "good"} />
        <StatTile label="Avg delay risk" value={`${avgRisk}%`} tone={avgRisk >= 40 ? "warn" : "good"} hint={`${stale} stale GPS`} />
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Live shipments</h2>
        <div className="mt-3 space-y-2">
          {ETA_SHIPMENTS.map((s) => {
            const reasons = etaConfidenceReasons(s);
            return (
              <div key={s.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{s.id}</span> ·{" "}
                    <span>{s.customer}</span> · <span className="text-muted-foreground">{s.driver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={confTone[s.confidence]}>{s.confidence}</Badge>
                    <Badge variant="outline" className={windowTone[s.status]}>{s.status.replace("_", " ")}</Badge>
                  </div>
                </div>
                <div className="mt-2 grid gap-2 text-xs text-muted-foreground md:grid-cols-5">
                  <div>ETA: <span className="text-foreground">{s.etaMin} min</span></div>
                  <div>Remaining: <span className="text-foreground">{s.remainingMi} mi</span></div>
                  <div>Avg: <span className="text-foreground">{s.avgSpeedMph} mph</span></div>
                  <div>GPS age: <span className="text-foreground">{s.gpsAgeSec}s</span></div>
                  <div>Delay risk: <span className="text-foreground">{s.delayRiskPct}%</span></div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {reasons.map((r, i) => (
                    <Badge key={i} variant="outline" className={reasonTone[r.tone]}>{r.label}</Badge>
                  ))}
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-fuchsia-300 hover:underline">Calculation inputs</summary>
                  <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                    {explainETAChange(s).map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </details>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">ETA update timeline (SHP-1042)</h2>
        <div className="mt-3 space-y-1.5 text-sm">
          {ETA_UPDATE_TIMELINE.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-3 py-1.5">
              <span><span className="font-mono text-xs text-muted-foreground">{e.at}</span> · {e.text}</span>
              <span className={e.delta > 0 ? "text-rose-300" : e.delta < 0 ? "text-emerald-300" : "text-muted-foreground"}>
                {e.delta > 0 ? `+${e.delta}m` : e.delta === 0 ? "—" : `${e.delta}m`}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">Confidence rules</h2>
        <ul className="mt-2 grid gap-1 md:grid-cols-2 list-disc pl-5">
          <li>GPS ≤30s → high · ≤2m → medium · ≤10m → low · &gt;10m → stale</li>
          <li>Speed below plan downgrades confidence one tier</li>
          <li>Dispatcher buffer is additive and always shown</li>
          <li>Late/at-risk surfaces in dispatcher board and customer portal</li>
        </ul>
      </Card>
    </V11Page>
  );
}
