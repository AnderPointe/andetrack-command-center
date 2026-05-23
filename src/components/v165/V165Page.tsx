import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V165Nav } from "./V165Nav";
import { Badge } from "@/components/ui/badge";

export function V165Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V165Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">Phase 46</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V16.5 predictive governance maturity</Badge>
            <Badge variant="outline" className="border-amber-400/40 text-amber-200">Assist-only · human approval required</Badge>
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
