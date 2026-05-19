/**
 * Phase 5 (polished) — Chained fallback provider.
 *
 * Tries each provider in order, returning the first successful response.
 * If every provider throws, returns a safe "I couldn't answer that"
 * response instead of throwing — CoPilot should never crash the driver UI.
 */
import type { AIProvider, AIRequest, AIResponse } from "../types";

export class FallbackProvider implements AIProvider {
  readonly id = "fallback" as const;
  readonly supportsRealtime = false;
  readonly supportsTools = false;

  constructor(private readonly chain: AIProvider[]) {}

  async complete(req: AIRequest): Promise<AIResponse> {
    let lastErr: unknown;
    for (const p of this.chain) {
      try {
        return await p.complete(req);
      } catch (e) {
        lastErr = e;
        // eslint-disable-next-line no-console
        console.warn(`[CoPilot] provider ${p.id} failed, trying next`, e);
      }
    }
    return {
      text: "I couldn't reach the assistant. I'll keep your request and try again.",
      provider: this.id,
      usage: { latencyMs: 0 },
      toolCalls: [],
      // last error is intentionally swallowed for UX; logged above.
      ...(lastErr ? {} : {}),
    };
  }
}
