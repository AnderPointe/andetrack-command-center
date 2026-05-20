import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QA_TESTS } from "@/mvp/data/mockMvp";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/mvp/qa")({
  head: () => ({ meta: [{ title: "MVP QA Plan — Anderoute" }] }),
  component: QaPage,
});

const TONE: Record<string, string> = {
  P0: "border-rose-500/30 text-rose-200",
  P1: "border-amber-500/30 text-amber-200",
};

function QaPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · QA</Badge>
          <div className="flex items-center gap-3">
            <FlaskConical className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">MVP QA Plan</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {QA_TESTS.map((t) => (
              <div key={t.id} className="grid grid-cols-12 items-center gap-2 py-2">
                <code className="col-span-1 text-xs text-muted-foreground">{t.id}</code>
                <div className="col-span-9">{t.scenario}</div>
                <div className="col-span-1"><Badge variant="outline" className={TONE[t.priority]}>{t.priority}</Badge></div>
                <div className="col-span-1 text-right text-xs text-muted-foreground">{t.type}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
