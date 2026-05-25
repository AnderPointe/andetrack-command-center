import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function LiquidThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "group relative inline-flex h-11 w-20 items-center rounded-full p-1",
        "border border-white/50 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-all duration-300 hover:shadow-[0_0_28px_rgba(20,184,166,0.45)]",
      ].join(" ")}
    >
      {/* Sliding glass knob */}
      <span
        className={[
          "absolute top-1 left-1 grid h-9 w-9 place-items-center rounded-full",
          "transition-all duration-500 ease-out",
          "border border-white/60 dark:border-white/20",
          "shadow-[0_4px_14px_rgba(15,23,42,0.18)]",
          isDark
            ? "translate-x-9 bg-gradient-to-br from-slate-700 to-slate-900 text-orange-300"
            : "translate-x-0 bg-gradient-to-br from-white to-teal-50 text-teal-600",
        ].join(" ")}
      >
        {isDark ? (
          <Moon className="h-4 w-4" strokeWidth={2.4} />
        ) : (
          <Sun className="h-4 w-4" strokeWidth={2.4} />
        )}
      </span>

      {/* Inactive icons (track) */}
      <span className="ml-1 flex w-9 justify-center text-amber-500/70 dark:text-slate-600">
        <Sun className="h-4 w-4" />
      </span>
      <span className="flex w-9 justify-center text-slate-400/70 dark:text-teal-300/70">
        <Moon className="h-4 w-4" />
      </span>
    </button>
  );
}
