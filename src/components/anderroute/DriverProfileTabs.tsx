import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  Route as RouteIcon,
  FileText,
  MessageSquare,
  History,
  type LucideIcon,
} from "lucide-react";

export type TabKey =
  | "overview"
  | "load"
  | "route"
  | "documents"
  | "messages"
  | "activity";

const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "load", label: "Load Details", icon: Package },
  { key: "route", label: "Route Timeline", icon: RouteIcon },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "activity", label: "Activity Log", icon: History },
];

interface Props {
  active: TabKey;
  onChange: (k: TabKey) => void;
  children?: ReactNode;
}

export function DriverProfileTabs({ active, onChange }: Props) {
  return (
    <nav className="rounded-[1.5rem] border border-white/10 bg-[#0f172a]/80 p-1.5 shadow-xl shadow-black/40 backdrop-blur-xl">
      <div className="flex flex-wrap gap-1">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#14b8a6]/20 via-[#14b8a6]/10 to-[#f97316]/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-[#14b8a6]/30"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 ${isActive ? "text-[#2dd4bf]" : ""}`}
              />
              <span className="uppercase tracking-wider">{label}</span>
              {isActive && (
                <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#f97316] shadow-[0_0_10px_rgba(20,184,166,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function TabPanelPlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <section className="rounded-[2rem] border border-dashed border-white/10 bg-[#0f172a]/60 p-12 text-center shadow-2xl shadow-black/40">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#14b8a6]/20 to-[#f97316]/15 text-[#2dd4bf] ring-1 ring-white/10">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-400">{description}</p>
    </section>
  );
}
