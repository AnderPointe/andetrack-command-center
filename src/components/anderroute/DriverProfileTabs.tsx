import {
  ClipboardList,
  FileText,
  History,
  Map,
  MessageSquare,
  Package,
  type LucideIcon,
} from "lucide-react";

export type TabKey =
  | "overview"
  | "load"
  | "route"
  | "documents"
  | "messages"
  | "activity";

interface DriverProfileTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function DriverProfileTabs({
  activeTab,
  onTabChange,
}: DriverProfileTabsProps) {
  const tabs = [
    { key: "overview" as const, label: "Overview", icon: ClipboardList },
    { key: "load" as const, label: "Load Details", icon: Package },
    { key: "route" as const, label: "Route Timeline", icon: Map },
    { key: "documents" as const, label: "Documents", icon: FileText },
    { key: "messages" as const, label: "Messages", icon: MessageSquare },
    { key: "activity" as const, label: "Activity Log", icon: History },
  ];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-2 shadow-xl backdrop-blur-xl">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-teal-500 to-orange-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
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
