import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligenceNav } from "@/components/intelligence/IntelligenceNav";
import { MockBadge } from "@/components/intelligence/MockBadge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Timer, Gauge, Users, AlertTriangle, CheckCircle2, MessageSquare,
  ClipboardCopy, TrendingDown,
} from "lucide-react";
import { useETAConfidence } from "@/intelligence/hooks/useIntelligence";
import type { Confidence, ETAConfidenceEvent } from "@/intelligence/types";

export const Route = createFileRoute("/intelligence/eta-confidence")({
  head: () => ({ meta: [{ title: "ETA Confidence — Anderoute Intelligence" }] }),
  component: ETAConfidencePage,
});

type Band = "high" | "medium" | "low";

const BAND_DEF: Record<Band, { min: number; max: number; label: string; tone: string; bar: string; chip: string }> = {
  high:   { min: 75, max: 100, label: "High confidence",   tone: "text-emerald-300", bar: "bg-emerald-400", chip: "border-emerald-500/30 text-emerald-300" },
  medium: { min: 50, max: 74,  label: "Medium confidence", tone: "text-amber-300",   bar: "bg-amber-400",   chip: "border-amber-500/30 text-amber-300" },
  low:    { min: 0,  max: 49,  label: "Low confidence",    tone: "text-rose-300",    bar: "bg-rose-400",    chip: "border-rose-500/40 text-rose-300" },
};

function bandOf(pct: number): Band {
  if (pct >= 75) return "high";
  if (pct >= 50) return "medium";
  return "low";
}

const FILTERS: (Band | "all")[] = ["all", "low", "medium", "high"];

function ETAConfidencePage() {
  const { events } = useETAConfidence();
  const [filter, setFilter] = useState<Band | "all">("all");

  const grouped = useMemo(() => {
    const g: Record<Band, ETAConfidenceEvent[]> = { high: [], medium: [], low: [] };
    for (const e of events) g[bandOf(e.confidence_pct)].push(e);
    return g;
  }, [events]);

  const avg = events.length
    ? Math.round(events.reduce((a, e) => a + e.confidence_pct, 0) / events.length)
    : 0;

  const driversImpacted = new Set(
    events.filter((e) => bandOf(e.confidence_pct) !== "high").map((e) => e.driver_name),
  ).size;

  const visible = filter === "all" ? events : grouped[filter];

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <Timer className="size-5 text-violet-300" />
            <h1 className="text-xl font-semibold">ETA Confidence Engine</h1>
            <MockBadge label="Mock confidence model · demo data" />
          </div>
          <p className="max-w-2xl text-xs text-muted-foreground">
            Per-load ETA confidence scored from GPS freshness, route corridor
            adherence, delivery window slack, and customer priority. Suggestions
            are drafts — dispatchers approve before any customer-facing update.
          </p>
          <IntelligenceNav />
        </header>

        {/* Summary band */}
        <div className="grid gap-3 md:grid-cols-4">
          <Summary icon={Gauge}      tone="text-violet-300"  label="Avg confidence"    value={`${avg}%`}                 sub={`${events.length} active ETAs`} />
          <Summary icon={CheckCircle2} tone="text-emerald-300" label="High band"        value={grouped.high.length}        sub="≥ 75%" />
          <Summary icon={AlertTriangle} tone="text-amber-300"  label="Medium band"     value={grouped.medium.length}      sub="50–74%" />
          <Summary icon={TrendingDown}  tone="text-rose-300"    label="Drivers impacted" value={driversImpacted}           sub="below high band" />
        </div>

        {/* Confidence band distribution */}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">Confidence bands</h2>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">distribution</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded bg-white/5">
            {(["high", "medium", "low"] as Band[]).map((b) => {
              const pct = events.length ? (grouped[b].length / events.length) * 100 : 0;
              return (
                <div
                  key={b}
                  className={BAND_DEF[b].bar}
                  style={{ width: `${pct}%` }}
                  title={`${BAND_DEF[b].label}: ${grouped[b].length}`}
                />
              );
            })}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(["high", "medium", "low"] as Band[]).map((b) => (
              <div key={b} className="flex items-center justify-between rounded border border-white/10 bg-black/20 px-3 py-2 text-xs">
                <span className={`inline-flex items-center gap-2 ${BAND_DEF[b].tone}`}>
                  <span className={`inline-block size-2 rounded-full ${BAND_DEF[b].bar}`} />
                  {BAND_DEF[b].label}
                </span>
                <span className="text-muted-foreground">
                  {grouped[b].length} · {BAND_DEF[b].min}–{BAND_DEF[b].max}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
                filter === f
                  ? "border-white/30 bg-white/10 text-foreground"
                  : "border-white/10 text-muted-foreground hover:bg-white/5"
              }`}
            >
              {f === "all" ? `All (${events.length})` : `${f} (${grouped[f].length})`}
            </button>
          ))}
        </div>

        {/* ETA cards */}
        <div className="grid gap-3 md:grid-cols-2">
          {visible
            .slice()
            .sort((a, b) => a.confidence_pct - b.confidence_pct)
            .map((e) => (
              <ETACard key={e.id} event={e} />
            ))}
          {visible.length === 0 && (
            <Card className="md:col-span-2 border-white/10 bg-white/[0.02] p-6 text-center text-sm text-muted-foreground">
              No ETAs in this band.
            </Card>
          )}
        </div>

        {/* Drivers impacted table */}
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Users className="size-4 text-violet-300" />
            <h2 className="text-sm font-medium">Drivers impacted</h2>
            <MockBadge label="demo" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-2 pr-3">Driver</th>
                  <th className="py-2 pr-3">Load</th>
                  <th className="py-2 pr-3">Confidence</th>
                  <th className="py-2 pr-3">Band</th>
                  <th className="py-2 pr-3">Top reason</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => {
                  const b = bandOf(e.confidence_pct);
                  return (
                    <tr key={e.id} className="border-t border-white/5">
                      <td className="py-2 pr-3 text-foreground">{e.driver_name}</td>
                      <td className="py-2 pr-3 text-muted-foreground">{e.load_id}</td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded bg-white/5">
                            <div className={`h-full ${BAND_DEF[b].bar}`} style={{ width: `${e.confidence_pct}%` }} />
                          </div>
                          <span className={BAND_DEF[b].tone}>{e.confidence_pct}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3">
                        <Badge variant="outline" className={BAND_DEF[b].chip}>
                          {b}
                        </Badge>
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground">{e.reasons[0] ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ETACard({ event }: { event: ETAConfidenceEvent }) {
  const b = bandOf(event.confidence_pct);
  const def = BAND_DEF[b];
  return (
    <Card className={`border bg-white/[0.02] p-4 ${def.chip}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {event.load_id} · {event.driver_name}
          </div>
          <div className={`mt-1 text-2xl font-semibold tabular-nums ${def.tone}`}>
            {event.confidence_pct}%
          </div>
        </div>
        <Badge variant="outline" className={def.chip}>{def.label}</Badge>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded bg-white/5">
        <div className={`h-full ${def.bar}`} style={{ width: `${event.confidence_pct}%` }} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
        {event.reasons.map((r) => (
          <span key={r} className="rounded border border-white/10 px-2 py-0.5 text-muted-foreground">
            {r}
          </span>
        ))}
      </div>

      <div className="mt-3 rounded border border-white/10 bg-black/20 p-2 text-xs">
        <div className="font-medium text-foreground">Recommended</div>
        <div className="text-muted-foreground">{event.recommended_action}</div>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <DraftBlock
          icon={ClipboardCopy}
          label="Dispatch note draft"
          text={event.dispatch_note_suggestion}
        />
        <DraftBlock
          icon={MessageSquare}
          label="Customer update draft"
          text={event.customer_update_suggestion}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>computed {new Date(event.computed_at).toLocaleTimeString()}</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-1.5 rounded-full bg-violet-400" />
          requires dispatcher approval
        </span>
      </div>
    </Card>
  );
}

function DraftBlock({ icon: Icon, label, text }: { icon: any; label: string; text: string }) {
  return (
    <div className="rounded border border-white/10 bg-black/30 p-2">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          <Icon className="size-3" /> {label}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
          onClick={() => navigator.clipboard?.writeText(text)}
        >
          Copy
        </Button>
      </div>
      <p className="mt-1 text-xs text-foreground">{text}</p>
    </div>
  );
}

function Summary({
  icon: Icon, tone, label, value, sub,
}: { icon: any; tone: string; label: string; value: string | number; sub: string }) {
  return (
    <Card className="border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
        <Icon className={`size-3.5 ${tone}`} /> {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </Card>
  );
}

export type _ConfidenceRef = Confidence;
