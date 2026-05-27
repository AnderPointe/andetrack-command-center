import React from "react";

type GlassTileProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function GlassTile({ children, className = "", onClick }: GlassTileProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden text-left
        rounded-[var(--radius-card)]
        border border-white/15
        bg-[var(--surface-glass)]
        p-5
        shadow-2xl
        backdrop-blur-[var(--glass-blur)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[var(--color-primary)]
        hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent" />
      <div className="relative z-10">{children}</div>
    </button>
  );
}
