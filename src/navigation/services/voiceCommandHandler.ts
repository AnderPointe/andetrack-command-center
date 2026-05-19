/**
 * Phase 4 — Voice command handler.
 *
 * Pure mapping layer: takes a resolved VoiceIntent and runs the matching
 * side-effect against the active NavigationProvider + Supabase. UI calls
 * `executeVoiceIntent()` so the same dispatch table works for Web Speech,
 * Mock, or future SDKs.
 */
import { supabase } from "@/integrations/supabase/client";
import { getNavigationProvider } from "../providers/registry";
import type { NavigationProviderId } from "../types/navigation";
import type { VoiceIntent } from "../types/voice";

export interface VoiceExecutionContext {
  providerId: NavigationProviderId;
  companyId: string;
  driverId: string;
  sessionId?: string | null;
  loadId?: string | null;
  setMuted?: (muted: boolean) => void;
  speak?: (text: string) => void;
}

export interface VoiceExecutionResult {
  handled: boolean;
  spoken: string;
  side_effect?: string;
}

export async function executeVoiceIntent(
  intent: VoiceIntent,
  transcript: string,
  ctx: VoiceExecutionContext,
): Promise<VoiceExecutionResult> {
  const provider = getNavigationProvider(ctx.providerId);
  const reply = (spoken: string, side_effect?: string): VoiceExecutionResult => {
    ctx.speak?.(spoken);
    return { handled: true, spoken, side_effect };
  };

  switch (intent) {
    // Navigation control
    case "nav.reroute": {
      const progress = provider.getRouteProgress();
      if (!progress) return reply("No active route to recalculate.");
      // Real adapters will call recalculateRoute with current location.
      return reply("Recalculating your route.", "reroute_requested");
    }
    case "nav.mute":   ctx.setMuted?.(true);  return reply("CoPilot muted.");
    case "nav.unmute": ctx.setMuted?.(false); return reply("CoPilot is back on.");
    case "nav.repeat": {
      const i = provider.getCurrentInstruction();
      return reply(i ?? "No current instruction.");
    }
    case "nav.pause":  await provider.pauseNavigation();  return reply("Navigation paused.");
    case "nav.resume": await provider.resumeNavigation(); return reply("Resuming navigation.");
    case "nav.stop":   await provider.stopNavigation();   return reply("Navigation stopped.");

    // Status updates
    case "status.on_break":         return logStatus(ctx, "on_break", "Break logged. Drive safe.", transcript);
    case "status.arrived_pickup":   return logStatus(ctx, "arrived_pickup", "Arrival at pickup logged.", transcript);
    case "status.arrived_dropoff":  return logStatus(ctx, "arrived_dropoff", "Delivery arrival logged.", transcript);
    case "status.delayed":          return logStatus(ctx, "delayed", "Delay reported to dispatch.", transcript);
    case "status.driving":          return logStatus(ctx, "driving", "Back on the road. Drive safe.", transcript);

    // Dispatch comms
    case "dispatch.call":         return reply("Calling dispatch.", "open_dispatch_call");
    case "dispatch.message":      return await sendDispatchMessage(ctx, transcript);
    case "dispatch.report_issue": return reply("Opening issue report.", "open_issue_report");

    // Load + POD
    case "load.mark_delivered":  return reply("Marking load delivered. Confirm in the panel.", "open_pod_confirm");
    case "load.take_pod_photo":  return reply("Opening camera for proof of delivery.", "open_pod_camera");
    case "load.read_next":       return reply("Reading your next load.", "open_next_load");

    case "copilot.ask":
    case "unknown":
    default:
      return { handled: false, spoken: "I didn't catch that." };
  }
}

async function logStatus(
  ctx: VoiceExecutionContext,
  status: string,
  spoken: string,
  transcript: string,
): Promise<VoiceExecutionResult> {
  ctx.speak?.(spoken);
  try {
    await supabase.from("voice_command_events").insert({
      company_id: ctx.companyId,
      driver_id: ctx.driverId,
      session_id: ctx.sessionId ?? null,
      transcript,
      intent: `status.${status}`,
      confidence: 0.95,
      handled: true,
      handler_result: { status },
    });
  } catch (err) {
    console.warn("voice status log failed", err);
  }
  return { handled: true, spoken, side_effect: `status_${status}` };
}

async function sendDispatchMessage(
  ctx: VoiceExecutionContext,
  transcript: string,
): Promise<VoiceExecutionResult> {
  const message = transcript.replace(/^(message dispatch|tell dispatch|send (to )?dispatch)[,:\s]*/i, "").trim();
  if (!message) {
    return { handled: true, spoken: "What should I send to dispatch?" };
  }
  ctx.speak?.("Sent to dispatch.");
  try {
    await supabase.from("dispatch_voice_messages").insert({
      company_id: ctx.companyId,
      dispatcher_id: ctx.driverId, // driver→dispatch uses driver as author; dispatcher reads via company scope
      driver_id: ctx.driverId,
      session_id: ctx.sessionId ?? null,
      message,
      priority: "normal",
    });
  } catch (err) {
    console.warn("dispatch message failed", err);
  }
  return { handled: true, spoken: "Sent to dispatch.", side_effect: "dispatch_message_sent" };
}
