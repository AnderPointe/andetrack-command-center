import { Hash, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConversationKind } from "./types";

export function MessengerIconChip({
  children,
  onClick,
  tone = "default",
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "default" | "danger" | "teal";
  title?: string;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        "grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md transition-all hover:border-[#6D35E8]/40 hover:bg-[#6D35E8]/15",
        tone === "default" && "text-primary",
        tone === "danger" && "text-red-300 hover:border-red-500/40 hover:bg-red-500/15",
        tone === "teal" && "text-teal-300 hover:border-teal-400/40 hover:bg-teal-500/15",
      )}
    >
      {children}
    </button>
  );
}

export function MessengerFilterChip({
  children,
  active,
  onClick,
  variant = "type",
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  variant?: "type" | "category";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium transition-all",
        active
          ? variant === "category"
            ? "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-primary shadow-[0_0_18px_-6px_rgba(109,53,232,0.7)]"
            : "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-primary"
          : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/15 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function MessengerAvatar({
  src,
  name,
  kind = "dm",
  online,
  size = 40,
}: {
  src?: string;
  name: string;
  kind?: ConversationKind;
  online?: boolean;
  size?: number;
}) {
  const dim = { width: size, height: size };
  const initials = name
    .replace(/[#·\-]/g, " ")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (kind === "channel") {
    return (
      <div
        style={dim}
        className="relative grid shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[#6D35E8]/25 to-[#14B8A6]/15 text-primary"
      >
        <Hash className="size-4" />
      </div>
    );
  }
  if (kind === "load") {
    return (
      <div
        style={dim}
        className="relative grid shrink-0 place-items-center rounded-xl border border-[#F97316]/35 bg-[#F97316]/15 text-orange-300"
      >
        <Truck className="size-4" />
      </div>
    );
  }
  return (
    <div
      style={dim}
      className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-white/10"
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[#1A1E33] text-[11px] font-semibold text-primary">
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-[#101326]",
            online ? "bg-[#22C55E]" : "bg-[#8B90A7]",
          )}
        />
      )}
    </div>
  );
}

export function MessengerSectionLabel({
  children,
  icon,
  action,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-3 pt-4 pb-1.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {icon}
        {children}
      </div>
      {action}
    </div>
  );
}

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/[0.08] bg-[#101326]/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
