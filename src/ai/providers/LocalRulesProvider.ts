/**
 * Phase 5 (polished) — Local rules provider.
 *
 * Pure pattern matching, zero network. Used as the offline fallback and as
 * a safety net when the primary provider errors. Keep responses short.
 */
import type { AIProvider, AIRequest, AIResponse } from "../types";

export class LocalRulesProvider implements AIProvider {
  readonly id = "local_rules" as const;
  readonly supportsRealtime = false;
  readonly supportsTools = false;

  async complete(req: AIRequest): Promise<AIResponse> {
    const p = req.prompt.trim().toLowerCase();
    let text = "I can answer ETA, next turn, and load status while offline.";
    if (/eta|when/.test(p))           text = "ETA unavailable offline — using last cached value.";
    else if (/turn|next/.test(p))     text = "Next turn unavailable offline.";
    else if (/help/.test(p))          text = "Try: 'what's my ETA', 'next turn', 'report delay'.";
    return { text, provider: this.id };
  }
}
