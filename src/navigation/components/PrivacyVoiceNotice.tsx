/**
 * Phase 4 — PrivacyVoiceNotice.
 *
 * Inline disclosure shown next to the CoPilot console. Anderoute does not
 * persist raw audio by default — only transcripts + intent metadata.
 */
import { ShieldCheck } from "lucide-react";

export function PrivacyVoiceNotice() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-emerald-300" />
      <div className="text-[11px] leading-snug text-zinc-400">
        <span className="font-medium text-zinc-200">Privacy:</span> CoPilot processes speech on-device.
        No raw audio is uploaded or stored — only the transcript and resolved intent are synced for dispatch visibility.
      </div>
    </div>
  );
}
