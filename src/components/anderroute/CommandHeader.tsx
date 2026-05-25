import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, MessageSquare, Phone, Plus, ChevronRight } from "lucide-react";

interface Props {
  driverId: string;
}

export function CommandHeader({ driverId }: Props) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#020617]/80 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-3">
        <Link
          to="/dispatch"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dispatch
        </Link>

        <nav className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
          <span>Drivers</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span>Active Shipments</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-mono font-semibold text-[#2dd4bf]">{driverId}</span>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10">
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Message</span>
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10">
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Call Driver</span>
        </button>
        <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#f97316] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#14b8a6]/30 transition-all duration-200 hover:shadow-[0_0_24px_rgba(20,184,166,0.45)] hover:brightness-110">
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Shipment</span>
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]" />
        </button>
      </div>
    </header>
  );
}
