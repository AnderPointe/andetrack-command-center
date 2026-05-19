/**
 * Phase 4 — useVoiceCoPilot.
 *
 * Wires the active VoiceProvider into a small state machine that:
 *   1. captures driver transcripts
 *   2. tries local intent detection first
 *   3. falls back to AI (copilotResolveIntent) for fuzzy phrases
 *   4. executes the matched intent via voiceCommandHandler
 *   5. speaks the response and logs the command
 *
 * Designed to be safe at highway speed: no buttons required, ducks audio,
 * dedupes echo, and surfaces an error state if the mic is blocked.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { copilotResolveIntent } from "../services/copilot.functions";
import { executeVoiceIntent, type VoiceExecutionContext } from "../services/voiceCommandHandler";
import { detectIntentLocally } from "../voice/intentRegistry";
import { getVoiceProvider } from "../voice/registry";
import type { VoiceIntent, VoiceListenerStatus, VoiceProviderId } from "../types/voice";

export interface VoiceCoPilotEntry {
  id: string;
  transcript: string;
  intent: VoiceIntent;
  spoken: string;
  source: "local" | "ai";
  at: string;
}

interface Options {
  providerId: VoiceProviderId;
  navigationProviderId: VoiceExecutionContext["providerId"];
  companyId: string;
  driverId: string;
  sessionId?: string | null;
  enabled?: boolean;
}

export function useVoiceCoPilot(opts: Options) {
  const { providerId, navigationProviderId, companyId, driverId, sessionId, enabled = true } = opts;
  const resolveIntent = useServerFn(copilotResolveIntent);

  const [status, setStatus] = useState<VoiceListenerStatus>("idle");
  const [muted, setMutedState] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [log, setLog] = useState<VoiceCoPilotEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const processing = useRef(false);

  // Subscribe to provider events
  useEffect(() => {
    if (!enabled) return;
    const provider = getVoiceProvider(providerId);
    const offS = provider.onStatusChange(setStatus);
    const offE = provider.onError((e) => setError(e.message));
    const offT = provider.onTranscript(async (t, final) => {
      setTranscript(t);
      if (!final || processing.current) return;
      processing.current = true;
      try {
        await handleTranscript(t);
      } finally {
        processing.current = false;
      }
    });
    setMutedState(provider.isMuted());
    return () => {
      offS();
      offE();
      offT();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId, enabled, navigationProviderId, companyId, driverId, sessionId]);

  const handleTranscript = useCallback(
    async (t: string) => {
      const provider = getVoiceProvider(providerId);
      const local = detectIntentLocally(t);
      let intent: VoiceIntent = local.intent;
      let spoken = "";
      let source: VoiceCoPilotEntry["source"] = "local";

      if (intent === "unknown" || intent === "copilot.ask") {
        try {
          const ai = await resolveIntent({ data: { transcript: t } });
          intent = ai.intent as VoiceIntent;
          spoken = ai.spoken_response;
          source = "ai";
        } catch (err) {
          setError(err instanceof Error ? err.message : "CoPilot unavailable");
          intent = "unknown";
        }
      }

      const exec = await executeVoiceIntent(intent, t, {
        providerId: navigationProviderId,
        companyId,
        driverId,
        sessionId,
        setMuted: (m) => {
          provider.setMuted(m);
          setMutedState(m);
        },
        speak: (s) => provider.speak(s, { interrupt: true, priority: "high" }),
      });

      if (!exec.handled && spoken) {
        provider.speak(spoken, { interrupt: true });
      }
      const entry: VoiceCoPilotEntry = {
        id: `vc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        transcript: t,
        intent,
        spoken: spoken || exec.spoken,
        source,
        at: new Date().toISOString(),
      };
      setLog((prev) => [entry, ...prev].slice(0, 20));

      // Persist command (best-effort)
      try {
        await supabase.from("voice_command_events").insert({
          company_id: companyId,
          driver_id: driverId,
          session_id: sessionId ?? null,
          transcript: t,
          intent,
          confidence: local.confidence || 0.7,
          handled: exec.handled,
          handler_result: { spoken: entry.spoken, side_effect: exec.side_effect ?? null, source },
        });
      } catch (err) {
        console.warn("voice command log failed", err);
      }
    },
    [providerId, navigationProviderId, companyId, driverId, sessionId, resolveIntent],
  );

  const start = useCallback(() => {
    setError(null);
    void getVoiceProvider(providerId).startListening();
  }, [providerId]);
  const stop = useCallback(() => getVoiceProvider(providerId).stopListening(), [providerId]);
  const setMuted = useCallback(
    (m: boolean) => {
      getVoiceProvider(providerId).setMuted(m);
      setMutedState(m);
    },
    [providerId],
  );
  const sayAgain = useCallback(
    (text: string) => getVoiceProvider(providerId).speak(text, { interrupt: true }),
    [providerId],
  );
  const simulate = useCallback(
    (text: string) => {
      const p = getVoiceProvider(providerId);
      if ("simulateTranscript" in p) (p as { simulateTranscript: (s: string) => void }).simulateTranscript(text);
      else void handleTranscript(text);
    },
    [providerId, handleTranscript],
  );

  return { status, transcript, muted, log, error, start, stop, setMuted, sayAgain, simulate };
}
