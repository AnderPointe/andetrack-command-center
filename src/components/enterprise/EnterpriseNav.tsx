import { Link, useLocation } from "@tanstack/react-router";
import {
  Plug, FileSpreadsheet, KeyRound, Webhook, Activity, Sparkles, Calculator,
  Palette, Mail, FileText, Database,
} from "lucide-react";

/** Phase 7 polish — unified sub-navigation across enterprise surfaces. */
const ITEMS = [
  { to: "/integrations/hub",       label: "Hub",          icon: Plug },
  { to: "/integrations/edi",       label: "EDI",          icon: FileSpreadsheet },
  { to: "/integrations/api",       label: "API",          icon: KeyRound },
  { to: "/integrations/webhooks",  label: "Webhooks",     icon: Webhook },
  { to: "/integrations/health",    label: "Health",       icon: Activity },
  { to: "/optimization/center",    label: "Optimize",     icon: Sparkles },
  { to: "/rating/quote",           label: "Rate quote",   icon: Calculator },
  { to: "/settings/white-label",   label: "White-label",  icon: Palette },
  { to: "/settings/email-templates", label: "Emails",     icon: Mail },
  { to: "/documents",              label: "Docs",         icon: FileText },
  { to: "/data/import-export",     label: "Import/Export", icon: Database },
] as const;

export function EnterpriseNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Enterprise sections"
      className="-mx-1 flex gap-1 overflow-x-auto pb-1 text-xs scrollbar-thin"
    >
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-teal-400/50 bg-teal-500/10 text-teal-200"
                : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
