/**
 * Phase 5 (polished) — AI provider abstraction for Anderoute CoPilot.
 *
 * Mirrors the Phase 3 navigation provider pattern: a single interface,
 * multiple swappable implementations (mock, local rules, OpenAI Realtime,
 * OpenAI Responses, fallback). No raw audio crosses this boundary by
 * default — only transcripts + tool calls.
 */

export type AIProviderId =
  | "mock"
  | "local_rules"
  | "openai_realtime"
  | "openai_responses"
  | "fallback";

export type CopilotRole = "driver" | "dispatcher" | "admin";

export type CopilotMode =
  | "driver_moving"
  | "driver_parked"
  | "dispatcher"
  | "admin"
  | "offline"
  | "emergency";

export interface AIToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface AIToolResult {
  name: string;
  ok: boolean;
  data?: unknown;
  error?: string;
}

export interface AIRequest {
  prompt: string;
  role: CopilotRole;
  mode: CopilotMode;
  /** Compact rolling history; provider may further trim. */
  history?: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  /** Allow-listed tool names for this turn (router decides). */
  allowedTools?: string[];
  /** Hard cap so a runaway response can't drain credits. */
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  toolCalls?: AIToolCall[];
  provider: AIProviderId;
  /** Best-effort estimates for cost dashboards. */
  usage?: { promptTokens?: number; completionTokens?: number; latencyMs?: number };
}

export interface AIProvider {
  readonly id: AIProviderId;
  readonly supportsRealtime: boolean;
  readonly supportsTools: boolean;
  complete(req: AIRequest): Promise<AIResponse>;
}
