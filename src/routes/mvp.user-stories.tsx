import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MvpNav } from "@/components/mvp/MvpNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USER_STORIES } from "@/mvp/data/mockMvp";
import { BookOpen, Check } from "lucide-react";

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
          <p className="text-xs text-muted-foreground">
            Each story has acceptance criteria. A story isn't done until every criterion is verifiable.
          </p>
          <MvpNav />
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {USER_STORIES.map((s) => (
            <Card key={s.id} className="border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <code className="text-xs text-muted-foreground">{s.id}</code>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-200">{s.role}</Badge>
                <span className="ml-auto flex items-center gap-2">
                  <Badge variant="outline" className={TONE[s.priority]}>{s.priority}</Badge>
                  <Badge variant="outline" className="border-white/15 text-muted-foreground">S{s.sprint}</Badge>
                </span>
              </div>
              <p className="mt-2 text-sm">
                As a <span className="text-cyan-200">{s.role.toLowerCase()}</span>, I want to {s.story.toLowerCase()}.
              </p>
              <div className="mt-3">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Acceptance</div>
                <ul className="mt-1 space-y-1 text-xs">
                  {s.acceptance.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 text-emerald-300" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
