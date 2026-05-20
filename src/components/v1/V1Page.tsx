import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { V1Nav } from "@/components/v1/V1Nav";
import { Badge } from "@/components/ui/badge";

export function V1Page({
  title,
  blurb,
  icon,
  children,
}: {
  title: string;
  blurb: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <AppShell>
      <div className="space-y-5">
        <V1Nav />
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-indigo-500/40 text-indigo-300">Phase 14</Badge>
            <Badge variant="outline" className="border-white/15 text-muted-foreground">Post-pilot V1</Badge>
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
