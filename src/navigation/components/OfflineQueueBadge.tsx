/**
 * Phase 4 — OfflineQueueBadge.
 *
 * Small status pill: shows connectivity + pending voice commands waiting
 * to sync. Click to force a flush. Privacy-friendly: no raw audio shown.
 */
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useOfflineVoiceQueue } from "../hooks/useOfflineVoiceQueue";
import { cn } from "@/lib/utils";

export function OfflineQueueBadge() {
  const { online, pending, flushNow } = useOfflineVoiceQueue();
  return (
    <button
      onClick={() => void flushNow()}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition",
        online
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
          : "border-amber-400/40 bg-amber-500/10 text-amber-200",
      )}
      title={online ? "Online — click to flush queue" : "Offline — commands will sync when reconnected"}
    >
      {online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      <span>{online ? "Online" : "Offline"}</span>
      {pending > 0 && (
        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-100">
          <RefreshCw className="h-2.5 w-2.5" />
          {pending} queued
        </span>
      )}
    </button>
  );
}
