/**
 * Phase 5 (polished) — OpenAI Responses provider (PLACEHOLDER).
 *
 * Wire this to the Lovable AI Gateway in a `createServerFn` so the OPENAI
 * key never reaches the client. The client-side class below only formats
 * the request and proxies via the server function.
 *
 * Until that server fn is wired, .complete() throws so callers fall back to
 * the FallbackProvider chain.
 */
import type { AIProvider, AIRequest, AIResponse } from "../types";

export class OpenAIResponsesProvider implements AIProvider {
  readonly id = "openai_responses" as const;
  readonly supportsRealtime = false;
  readonly supportsTools = true;

  async complete(_req: AIRequest): Promise<AIResponse> {
    throw new Error("OpenAIResponsesProvider not wired. Add a createServerFn that proxies the Lovable AI Gateway.");
  }
}
