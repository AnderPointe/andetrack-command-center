import type { DispatchDriver } from "@/types/dispatch";
import type { DriverProfileDemo } from "@/data/driverProfileDemo";
import { DriverProfileView } from "./DriverProfileView";
import {
  LayoutGrid,
  Truck,
  ClipboardList,
  Map as MapIcon,
  Bell,
  Settings,
  Users,
} from "lucide-react";

interface Props {
  driver: DispatchDriver;
  profile: DriverProfileDemo;
}

/**
 * Full-screen route wrapper around DriverProfileView.
 *
 * Adds the fixed layout shell (left rail + full viewport) so the page
 * works standalone at /drivers/$driverId. For embedding inside modals or
 * panels, use <DriverProfileView /> directly.
 */
export function DriverProfilePage({ driver, profile }: Props) {
  return (
    <div className="fixed inset-0 flex overflow-hidden bg-slate-950 text-slate-100">
      <SideRail />
      <DriverProfileView driver={driver} profile={profile} />
    </div>
  );
}

function SideRail() {
  const items = [
    { icon: LayoutGrid, label: "Dispatch" },
    { icon: Users, label: "Drivers", active: true },
    { icon: Truck, label: "Fleet" },
    { icon: ClipboardList, label: "Loads" },
    { icon: MapIcon, label: "Map" },
    { icon: Bell, label: "Alerts" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <aside className="flex w-[76px] flex-col items-center gap-1 border-r border-white/5 bg-slate-950/80 py-5 backdrop-blur">
      <div className="mb-4 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-sm font-black text-slate-950 shadow-lg shadow-teal-500/30">
        AR
      </div>
      {items.map((it) => (
        <button
          key={it.label}
          title={it.label}
          className={`grid size-11 place-items-center rounded-xl transition ${
            it.active
              ? "bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/30"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <it.icon className="size-5" />
        </button>
      ))}
    </aside>
  );
}
