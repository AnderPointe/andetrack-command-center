import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  breadcrumbs: string[];
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function DashboardHeader({
  breadcrumbs,
  title,
  actionLabel = "Dispatch Shipment",
  onAction,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-slate-500">{breadcrumbs.join(" › ")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-500 md:flex">
          <Search className="h-4 w-4" />
          <span>Search shipments, drivers…</span>
        </div>
        <button className="relative grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <button
          onClick={onAction}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {actionLabel}
        </button>
      </div>
    </header>
  );
}
