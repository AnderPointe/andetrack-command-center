/**
 * Phase 3 — Utility helpers shared by navigation components.
 */
import type { ManeuverType } from "../types/navigation";

export const ManeuverIcon: Record<ManeuverType, string> = {
  "depart": "🚦",
  "turn-left": "⬅️",
  "turn-right": "➡️",
  "turn-slight-left": "↖️",
  "turn-slight-right": "↗️",
  "turn-sharp-left": "↩️",
  "turn-sharp-right": "↪️",
  "straight": "⬆️",
  "merge": "🔀",
  "fork": "🛣️",
  "roundabout": "🔄",
  "ramp": "🛤️",
  "exit": "🛑",
  "uturn": "↺",
  "arrive": "📍",
};

export function formatDistance(meters: number | null | undefined): string {
  if (meters == null) return "—";
  const mi = meters / 1609.34;
  if (mi >= 10) return `${mi.toFixed(0)} mi`;
  if (mi >= 0.3) return `${mi.toFixed(1)} mi`;
  return `${Math.round(meters)} m`;
}

export function formatEta(minutes: number | null | undefined): string {
  if (minutes == null) return "—";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export function severityColorClass(s: "info" | "warning" | "critical"): string {
  switch (s) {
    case "critical": return "border-red-400/50 bg-red-500/10 text-red-100";
    case "warning":  return "border-amber-400/50 bg-amber-500/10 text-amber-100";
    default:         return "border-emerald-400/40 bg-emerald-500/10 text-emerald-100";
  }
}
