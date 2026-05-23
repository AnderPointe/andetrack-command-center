import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V18Nav } from "./V18Nav";
import { Badge } from "@/components/ui/badge";

export function V18Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V18Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-violet-400/40 text-violet-200">Phase 49</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V18 autonomous-assist scale governance</Badge>
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
