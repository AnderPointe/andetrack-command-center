import { useEffect, useMemo, useState } from "react";
import { Search, Truck, User, Hash, AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Contact } from "./types";

export function MessengerCommandPalette({
  open,
  onClose,
  contacts,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  contacts: Contact[];
  onSelect: (id: string) => void;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const quick = useMemo(
    () => [
      { id: "cmd-delayed", label: "Show delayed loads", icon: AlertTriangle },
      { id: "cmd-emergency", label: "Create emergency alert", icon: AlertTriangle },
      { id: "cmd-map", label: "Open live map", icon: MapPin },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return contacts.slice(0, 8);
    return contacts
      .filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.role.toLowerCase().includes(s) ||
          (c.linkedLoad?.id.toLowerCase().includes(s) ?? false) ||
          (c.company?.toLowerCase().includes(s) ?? false),
      )
      .slice(0, 12);
  }, [q, contacts]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start bg-black/60 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[min(640px,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-[#101326]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <Search className="size-4 text-[#8B90A7]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search drivers, loads, customers, channels…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#8B90A7]"
          />
          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-[#8B90A7]">
            ESC
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8B90A7]">
            Conversations
          </div>
          {filtered.map((c) => {
            const Icon =
              c.kind === "channel" ? Hash : c.kind === "load" ? Truck : User;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelect(c.id);
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5",
                )}
              >
                <Icon className="size-4 text-[#B79CFF]" />
                <span className="flex-1 truncate text-white">{c.name}</span>
                <span className="text-[11px] text-[#8B90A7]">{c.role}</span>
                {c.linkedLoad && (
                  <span className="rounded border border-[#F97316]/35 bg-[#F97316]/10 px-1.5 py-0.5 text-[10px] text-orange-300">
                    {c.linkedLoad.id}
                  </span>
                )}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-[#8B90A7]">
              No matches
            </div>
          )}

          <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8B90A7]">
            Quick actions
          </div>
          {quick.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={onClose}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
              >
                <Icon className="size-4 text-[#F97316]" />
                <span className="text-white">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
