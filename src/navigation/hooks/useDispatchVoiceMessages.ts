/**
 * Phase 4 — useDispatchVoiceMessages.
 *
 * Driver-side hook: subscribes to dispatch_voice_messages addressed to this
 * driver, plays them aloud via the active voice provider, and exposes an
 * acknowledge() to mark them read.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getVoiceProvider } from "../voice/registry";
import type { VoiceProviderId } from "../types/voice";

export interface DispatchVoiceMessage {
  id: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
  dispatcher_id: string;
  delivered_at: string | null;
  acknowledged_at: string | null;
  created_at: string;
}

export function useDispatchVoiceMessages(
  driverId: string,
  voiceProviderId: VoiceProviderId,
  opts: { autoplay?: boolean } = { autoplay: true },
) {
  const [messages, setMessages] = useState<DispatchVoiceMessage[]>([]);

  useEffect(() => {
    if (!driverId) return;
    let alive = true;

    void supabase
      .from("dispatch_voice_messages")
      .select("id,message,priority,dispatcher_id,delivered_at,acknowledged_at,created_at")
      .eq("driver_id", driverId)
      .is("acknowledged_at", null)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (!alive || !data) return;
        setMessages(data as DispatchVoiceMessage[]);
      });

    const channel = supabase
      .channel(`dispatch-voice-${driverId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "dispatch_voice_messages", filter: `driver_id=eq.${driverId}` },
        (payload) => {
          const m = payload.new as DispatchVoiceMessage;
          setMessages((prev) => [m, ...prev]);
          if (opts.autoplay) {
            const interrupt = m.priority === "urgent" || m.priority === "high";
            void getVoiceProvider(voiceProviderId).speak(`Dispatch: ${m.message}`, { interrupt });
          }
        },
      )
      .subscribe();

    return () => {
      alive = false;
      void supabase.removeChannel(channel);
    };
  }, [driverId, voiceProviderId, opts.autoplay]);

  const acknowledge = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await supabase
      .from("dispatch_voice_messages")
      .update({ acknowledged_at: new Date().toISOString() })
      .eq("id", id);
  };

  return { messages, acknowledge };
}
