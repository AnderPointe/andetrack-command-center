/**
 * Phase 5 (polished) — OpenAI Realtime provider (PLACEHOLDER).
 *
 * Real implementation will open a WebRTC or WebSocket session to OpenAI
 * Realtime using a short-lived token minted by a server function. Audio
 * stays in the browser; only transcripts + tool calls cross the boundary.
 *
 * For now this throws so the FallbackProvider can hand off to LocalRules.
 */
import type { AIProvider, AIRequest, AIResponse } from "../types";

export class OpenAIRealtimeProvider implements AIProvider {
  readonly id = "openai_realtime" as const;
  readonly supportsRealtime = true;
  readonly supportsTools = true;

  async complete(_req: AIRequest): Promise<AIResponse> {
    throw new Error("OpenAIRealtimeProvider not wired. Needs a server-side ephemeral-token minter.");
  }
}
