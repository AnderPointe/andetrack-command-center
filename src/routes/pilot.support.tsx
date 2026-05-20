import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { useMemo, useState } from "react";
import { PilotPage } from "@/components/pilot/PilotPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_TICKETS, SUPPORT_CATEGORIES } from "@/pilot/data/mockPhase13Extra";

export const Route = createFileRoute("/pilot/support")({
  head: () => ({ meta: [{ title: "Pilot Support · Anderoute" }] }),
  component: Page,
});

const TONE: Record<string, string> = {
  open: "border-rose-500/30 text-rose-300",
  in_progress: "border-sky-500/30 text-sky-300",
  waiting: "border-amber-500/30 text-amber-300",
  resolved: "border-emerald-500/30 text-emerald-300",
};

const SLA: Record<string, string> = {
  P0: "1h response · 4h resolution",
  P1: "4h response · 1d resolution",
  P2: "1d response · 3d resolution",
  P3: "3d response · best-effort",
};

type Filter = "all" | "open" | "P0" | "driver" | "customer";

function Page() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => {
    switch (filter) {
      case "open":     return SUPPORT_TICKETS.filter((t) => t.status !== "resolved");
      case "P0":       return SUPPORT_TICKETS.filter((t) => t.priority === "P0");
      case "driver":   return SUPPORT_TICKETS.filter((t) => t.role === "driver");
      case "customer": return SUPPORT_TICKETS.filter((t) => t.role === "customer");
      default:         return SUPPORT_TICKETS;
    }
  }, [filter]);

  const open = SUPPORT_TICKETS.filter((t) => t.status !== "resolved").length;
  const p0 = SUPPORT_TICKETS.filter((t) => t.priority === "P0" && t.status !== "resolved").length;

  return (
    <PilotPage
      icon={<LifeBuoy className="size-6 text-teal-300" />}
      title="Pilot Support Center"
      blurb="In-app tickets, escalations, FAQ, and known issues for the first pilot company. SLAs are tracked per priority."
    >
      <div className="grid gap-3 md:grid-cols-4">
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Open tickets</div>
          <div className="mt-1 text-2xl font-semibold">{open}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Open P0</div>
          <div className={`mt-1 text-2xl font-semibold ${p0 > 0 ? "text-rose-300" : "text-emerald-300"}`}>{p0}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Resolved</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-300">{SUPPORT_TICKETS.length - open}</div>
        </Card>
        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Categories</div>
          <div className="mt-1 text-2xl font-semibold">{SUPPORT_CATEGORIES.length}</div>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">SLA targets</h2>
        <div className="mt-2 grid gap-2 md:grid-cols-4 text-xs">
          {(["P0", "P1", "P2", "P3"] as const).map((p) => (
            <div key={p} className="rounded border border-white/10 bg-black/20 p-2">
              <Badge variant="outline" className={p === "P0" ? "border-rose-500/30 text-rose-300" : "border-white/15 text-muted-foreground"}>{p}</Badge>
              <div className="mt-1 text-muted-foreground">{SLA[p]}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <h2 className="text-sm font-semibold">Categories</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUPPORT_CATEGORIES.map((c) => (
            <Badge key={c} variant="outline" className="border-white/15 text-muted-foreground">{c}</Badge>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Tickets</h2>
          <div className="flex gap-1.5">
            {(["all", "open", "P0", "driver", "customer"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-2 py-0.5 text-[11px] capitalize ${filter === f ? "border-teal-500/40 bg-teal-500/10 text-teal-200" : "border-white/15 text-muted-foreground hover:border-white/30"}`}
              >{f}</button>
            ))}
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {visible.map((t) => (
            <div key={t.id} className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                <span className="font-medium">{t.subject}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.category}</Badge>
                <Badge variant="outline" className="border-white/15 text-muted-foreground">{t.role}</Badge>
                <Badge variant="outline" className={t.priority === "P0" ? "border-rose-500/30 text-rose-300" : "border-white/15 text-muted-foreground"}>{t.priority}</Badge>
                <Badge variant="outline" className={TONE[t.status]}>{t.status.replace("_", " ")}</Badge>
                {t.owner && <Badge variant="outline" className="border-white/15 text-muted-foreground">owner: {t.owner}</Badge>}
                <span className="text-muted-foreground">· {t.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PilotPage>
  );
}
