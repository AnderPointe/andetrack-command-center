import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V23Nav } from "./V23Nav";
import { Badge } from "@/components/ui/badge";

export function V23Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V23Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">Phase 59</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V23 enterprise trust automation operating network</Badge>
            <Badge variant="outline" className="border-amber-400/40 text-amber-200">HITL · approver_id ≠ recommender_id</Badge>
          </div>
          <div className="flex items-center gap-3">
            {icon}
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">{blurb}</p>
        </header>
        {children}
      </div>
    </AppShell>
  );
}
