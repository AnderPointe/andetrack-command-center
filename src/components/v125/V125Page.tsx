import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V125Nav } from "./V125Nav";
import { Badge } from "@/components/ui/badge";

export function V125Page({ title, blurb, icon, children }: { title: string; blurb: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V125Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-teal-400/40 text-teal-200">Phase 38</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">V12.5 capital-grade growth operations</Badge>
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
