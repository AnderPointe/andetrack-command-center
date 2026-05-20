import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ADRS } from "@/mvp/data/mockMvp";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/mvp/adrs")({
  head: () => ({ meta: [{ title: "ADRs — Anderoute" }] }),
  component: AdrPage,
});

function AdrPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · ADRs</Badge>
          <div className="flex items-center gap-3">
            <FileText className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">Architecture Decision Records</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Context, alternatives considered, and consequences for each MVP-shaping decision.
          </p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {ADRS.map((a) => (
            <Card key={a.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <code className="text-xs text-muted-foreground">{a.id}</code>
                <Badge
                  variant="outline"
                  className={a.decision === "Adopt" ? "border-emerald-500/30 text-emerald-200" : "border-rose-500/30 text-rose-200"}
                >
                  {a.decision}
                </Badge>
              </div>
              <h3 className="mt-1 text-sm font-medium text-cyan-200">{a.title}</h3>

              <div className="mt-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Context</div>
                <p className="text-xs">{a.context}</p>
              </div>

              <div className="mt-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Alternatives</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {a.alternatives.map((alt) => (
                    <Badge key={alt} variant="outline" className="border-white/15 text-xs text-muted-foreground">{alt}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Consequences</div>
                <p className="text-xs">{a.consequences}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
