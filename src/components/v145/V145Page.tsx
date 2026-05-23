import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V145Nav } from "./V145Nav";
import { Badge } from "@/components/ui/badge";

export function V145Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V145Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-fuchsia-400/40 text-fuchsia-200">Phase 42</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V14.5 enterprise operating excellence</Badge>
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
