/**
 * Phase 5 (polished) — AI provider registry.
 *
 * Default chain: MockAI → LocalRules. Swap the head to OpenAIResponses
 * once the server-fn proxy is in place, keeping LocalRules at the tail
 * as the always-on fallback.
 */
import type { AIProvider, AIProviderId } from "./types";
import { MockAIProvider } from "./providers/MockAIProvider";
import { LocalRulesProvider } from "./providers/LocalRulesProvider";
import { OpenAIResponsesProvider } from "./providers/OpenAIResponsesProvider";
import { OpenAIRealtimeProvider } from "./providers/OpenAIRealtimeProvider";
import { FallbackProvider } from "./providers/FallbackProvider";

export const DEFAULT_AI_PROVIDER: AIProviderId = "mock";

let _provider: AIProvider | null = null;

export function getAIProvider(id: AIProviderId = DEFAULT_AI_PROVIDER): AIProvider {
  if (_provider && _provider.id === id) return _provider;
  switch (id) {
    case "mock":             _provider = new MockAIProvider(); break;
    case "local_rules":      _provider = new LocalRulesProvider(); break;
    case "openai_responses": _provider = new FallbackProvider([new OpenAIResponsesProvider(), new LocalRulesProvider()]); break;
    case "openai_realtime":  _provider = new FallbackProvider([new OpenAIRealtimeProvider(), new OpenAIResponsesProvider(), new LocalRulesProvider()]); break;
    case "fallback":         _provider = new FallbackProvider([new MockAIProvider(), new LocalRulesProvider()]); break;
  }
  return _provider!;
}

export function resetAIProvider() { _provider = null; }
