/**
 * Phase 4 — Local intent registry.
 *
 * Fast, offline, deterministic mapping from short driver utterances to
 * VoiceIntents. Anything that doesn't match here is sent to the AI fallback
 * (copilotIntentServerFn) for fuzzy understanding.
 *
 * Driver phrases are intentionally short (in-cab safety). Keep patterns
 * permissive but unambiguous.
 */
import type { VoiceIntent } from "../types/voice";

interface IntentSpec {
  intent: VoiceIntent;
  patterns: RegExp[];
  example: string;
  category: "navigation" | "status" | "dispatch" | "load" | "copilot";
}

export const VOICE_INTENTS: IntentSpec[] = [
  // navigation
  { intent: "nav.reroute", patterns: [/\b(reroute|recalculate|new route)\b/i], example: "Reroute", category: "navigation" },
  { intent: "nav.mute", patterns: [/\b(mute|quiet|stop talking)\b/i], example: "Mute", category: "navigation" },
  { intent: "nav.unmute", patterns: [/\b(unmute|talk again|voice on)\b/i], example: "Unmute", category: "navigation" },
  { intent: "nav.repeat", patterns: [/\b(repeat|say again|what'?s next)\b/i], example: "Repeat", category: "navigation" },
  { intent: "nav.pause", patterns: [/\b(pause( navigation)?|hold (the )?nav)\b/i], example: "Pause navigation", category: "navigation" },
  { intent: "nav.resume", patterns: [/\b(resume|continue navigation)\b/i], example: "Resume", category: "navigation" },
  { intent: "nav.stop", patterns: [/\b(stop navigation|end navigation|cancel route)\b/i], example: "Stop navigation", category: "navigation" },
  // status
  { intent: "status.on_break", patterns: [/\b(on break|taking (a )?break|starting break)\b/i], example: "I'm on break", category: "status" },
  { intent: "status.arrived_pickup", patterns: [/\b(arrived (at )?pickup|at pickup|reached pickup)\b/i], example: "Arrived at pickup", category: "status" },
  { intent: "status.arrived_dropoff", patterns: [/\b(arrived (at )?(dropoff|drop ?off|delivery)|reached drop)\b/i], example: "Arrived at dropoff", category: "status" },
  { intent: "status.delayed", patterns: [/\b(delayed|running (late|behind)|will be late)\b/i], example: "Delayed twenty minutes", category: "status" },
  { intent: "status.driving", patterns: [/\b(back on the road|driving again|resuming drive)\b/i], example: "Back on the road", category: "status" },
  // dispatch
  { intent: "dispatch.call", patterns: [/\b(call dispatch|phone dispatch)\b/i], example: "Call dispatch", category: "dispatch" },
  { intent: "dispatch.message", patterns: [/\b(message dispatch|tell dispatch|send (to )?dispatch)\b/i], example: "Send message to dispatch", category: "dispatch" },
  { intent: "dispatch.report_issue", patterns: [/\b(report (an )?issue|problem with (the )?load|flag (a )?problem)\b/i], example: "Report issue", category: "dispatch" },
  // load
  { intent: "load.mark_delivered", patterns: [/\b(mark delivered|load delivered|finish delivery)\b/i], example: "Mark delivered", category: "load" },
  { intent: "load.take_pod_photo", patterns: [/\b(take (a )?(pod|proof) photo|pod picture|capture (pod|proof))\b/i], example: "Take POD photo", category: "load" },
  { intent: "load.read_next", patterns: [/\b(next load|read next|what'?s my next load)\b/i], example: "Read next load", category: "load" },
];

export function detectIntentLocally(transcript: string): {
  intent: VoiceIntent;
  confidence: number;
} {
  const t = transcript.trim();
  if (!t) return { intent: "unknown", confidence: 0 };
  for (const spec of VOICE_INTENTS) {
    if (spec.patterns.some((re) => re.test(t))) {
      return { intent: spec.intent, confidence: 0.95 };
    }
  }
  // Anything starting with "hey copilot" or a question gets the AI ask path.
  if (/^(hey )?co-?pilot[,\s]|^(what|how|where|why|when|is|are|can|should)\b/i.test(t)) {
    return { intent: "copilot.ask", confidence: 0.6 };
  }
  return { intent: "unknown", confidence: 0 };
}

export function intentCategory(intent: VoiceIntent): IntentSpec["category"] {
  return VOICE_INTENTS.find((s) => s.intent === intent)?.category ?? "copilot";
}
