import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USER_STORIES } from "@/mvp/data/mockMvp";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/mvp/user-stories")({
  head: () => ({ meta: [{ title: "User Stories — Anderoute" }] }),
  component: Stories,
});

const TONE: Record<string, string> = {
  P0: "border-rose-500/30 text-rose-200",
  P1: "border-amber-500/30 text-amber-200",
  P2: "border-blue-500/30 text-blue-200",
  P3: "border-white/15 text-muted-foreground",
};

function Stories() {
  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-3">
          <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Phase 11 · Stories</Badge>
          <div className="flex items-center gap-3">
            <BookOpen className="size-6 text-cyan-300" />
            <h1 className="text-2xl font-semibold">User Stories</h1>
          </div>
          <MvpNav />
        </header>

        <Card className="border-white/10 bg-white/[0.02] p-4">
          <div className="divide-y divide-white/5 text-sm">
            {USER_STORIES.map((s) => (
              <div key={s.id} className="grid grid-cols-12 items-center gap-2 py-2">
                <code className="col-span-1 text-xs text-muted-foreground">{s.id}</code>
                <div className="col-span-2 text-xs text-cyan-200">{s.role}</div>
                <div className="col-span-7">As a {s.role.toLowerCase()}, I want to {s.story.toLowerCase()}.</div>
                <div className="col-span-1"><Badge variant="outline" className={TONE[s.priority]}>{s.priority}</Badge></div>
                <div className="col-span-1 text-right text-xs text-muted-foreground">S{s.sprint}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
