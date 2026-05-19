/**
 * Phase 5 (polished) — Mock AI provider.
 *
 * Deterministic responses keyed off the user prompt. Lets the CoPilot UI
 * exercise tool-call rendering, mode switching, and offline fallbacks
 * without consuming credits or requiring an API key.
 */
import type { AIProvider, AIRequest, AIResponse } from "../types";

export class MockAIProvider implements AIProvider {
  readonly id = "mock" as const;
  readonly supportsRealtime = false;
  readonly supportsTools = true;

  async complete(req: AIRequest): Promise<AIResponse> {
    const p = req.prompt.toLowerCase();
    const t0 = performance.now();

    if (req.mode === "offline") {
      return this.respond("Offline: showing cached info only. I queued your request.", req, t0);
    }
    if (req.mode === "emergency") {
      return this.respond("Emergency confirmed. Do you need 911?", req, t0, [
        { name: "create_alert", arguments: { severity: "critical", message: req.prompt } },
      ]);
    }
    if (/eta|how long|when/.test(p)) {
      return this.respond("ETA 1h 24m to next stop.", req, t0, [{ name: "get_current_eta", arguments: {} }]);
    }
    if (/turn|next|exit/.test(p)) {
      return this.respond("Right onto I-10 W in 0.3 mi.", req, t0, [{ name: "get_next_turn", arguments: {} }]);
    }
    if (/delay|late/.test(p)) {
      return this.respond("Got it — reporting a delay.", req, t0, [
        { name: "report_delay", arguments: { reason: req.prompt, minutes: 15 } },
      ]);
    }
    if (req.mode === "driver_moving") {
      return this.respond("Acknowledged.", req, t0);
    }
    return this.respond(`(mock) You said: "${req.prompt}". Tool-call wiring is live.`, req, t0);
  }

  private respond(text: string, _req: AIRequest, t0: number, toolCalls?: AIResponse["toolCalls"]): AIResponse {
    return {
      text,
      toolCalls,
      provider: this.id,
      usage: { latencyMs: Math.round(performance.now() - t0) },
    };
  }
}
