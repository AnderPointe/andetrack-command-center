import { cn } from "@/lib/utils";

export function MessengerIconChip({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-[#0D1020] text-[#B79CFF] transition-all hover:border-[#6D35E8]/40 hover:bg-[#6D35E8]/15"
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
            ? "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-[#D4C4FF] shadow-[0_0_18px_-6px_rgba(109,53,232,0.7)]"
            : "border-[#6D35E8]/50 bg-[#6D35E8]/20 text-[#D4C4FF]"
          : "border-white/[0.08] bg-[#0D1020] text-[#8B90A7] hover:border-white/15 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function MessengerAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  );
}

export function MessengerSectionLabel({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 pt-3 pb-1.5 text-[11px] uppercase tracking-[0.14em] text-[#8B90A7]">
      {icon}
      {children}
    </div>
  );
}
