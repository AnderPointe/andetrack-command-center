/**
 * Phase 4 — CoPilot server functions.
 *
 * - copilotResolveIntent: AI fallback intent classifier + short driver-safe answer.
 * - copilotRouteIntelligence: AI-generated traffic/ETA risk + CDL hazard + fuel/rest suggestions.
 *
 * Both call the Lovable AI Gateway. Driver UI never talks to the gateway directly.
 */
import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

interface IntentInput {
  transcript: string;
  context?: {
    navigation_active?: boolean;
    has_load?: boolean;
    is_on_break?: boolean;
  };
}

interface IntentOutput {
  intent: string;
  confidence: number;
  spoken_response: string;
  parameters?: Record<string, unknown>;
}

const ALLOWED_INTENTS = [
  "nav.reroute","nav.mute","nav.unmute","nav.repeat","nav.pause","nav.resume","nav.stop",
  "status.on_break","status.arrived_pickup","status.arrived_dropoff","status.delayed","status.driving",
  "dispatch.call","dispatch.message","dispatch.report_issue",
  "load.mark_delivered","load.take_pod_photo","load.read_next",
  "copilot.ask","unknown",
] as const;

export const copilotResolveIntent = createServerFn({ method: "POST" })
  .inputValidator((input: IntentInput) => {
    if (!input || typeof input.transcript !== "string" || input.transcript.length > 500) {
      throw new Error("Invalid transcript");
    }
    return input;
  })
  .handler(async ({ data }): Promise<IntentOutput> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        intent: "unknown",
        confidence: 0,
        spoken_response: "CoPilot is offline. Please try again later.",
      };
    }

    const system = [
      "You are Anderoute CoPilot, an in-cab AI co-driver for commercial CDL truck drivers.",
      "Drivers speak short phrases while driving. Classify the intent and reply in ONE short sentence (max 14 words).",
      "Never give long instructions. Never read URLs. Never invent navigation commands.",
      `Allowed intents: ${ALLOWED_INTENTS.join(", ")}. Use "unknown" if unclear.`,
      "Return your answer ONLY via the classify_voice_command tool.",
    ].join(" ");

    const body = {
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Driver said: "${data.transcript}". Context: ${JSON.stringify(data.context ?? {})}` },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "classify_voice_command",
            description: "Classify the driver's spoken phrase and write a short spoken response.",
            parameters: {
              type: "object",
              properties: {
                intent: { type: "string", enum: ALLOWED_INTENTS as unknown as string[] },
                confidence: { type: "number", minimum: 0, maximum: 1 },
                spoken_response: { type: "string", maxLength: 160 },
                parameters: { type: "object", additionalProperties: true },
              },
              required: ["intent", "confidence", "spoken_response"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "classify_voice_command" } },
    };

    const resp = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      console.error("CoPilot intent gateway error:", resp.status, text);
      if (resp.status === 429) throw new Error("Rate limit exceeded. Please retry in a moment.");
      if (resp.status === 402) throw new Error("AI credits exhausted. Please top up your Lovable workspace.");
      throw new Error("CoPilot temporarily unavailable.");
    }
    const json = await resp.json();
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!call?.function?.arguments) {
      return { intent: "unknown", confidence: 0, spoken_response: "I didn't catch that." };
    }
    const parsed = JSON.parse(call.function.arguments) as IntentOutput;
    return parsed;
  });

interface IntelInput {
  destination?: string;
  remaining_minutes: number;
  remaining_miles: number;
  vehicle_profile?: {
    is_cdl?: boolean;
    height_ft?: number;
    weight_lbs?: number;
    hazmat?: boolean;
  };
  conditions?: {
    weather?: string;
    traffic?: "free" | "light" | "moderate" | "heavy" | "severe";
    hours_until_break_required?: number;
    fuel_level_pct?: number;
  };
}

export interface RouteIntelligenceInsight {
  insight_type: "traffic_risk" | "eta_risk" | "fuel_stop" | "rest_stop" | "cdl_hazard" | "weather";
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  distance_ahead_m?: number;
}

export const copilotRouteIntelligence = createServerFn({ method: "POST" })
  .inputValidator((input: IntelInput) => {
    if (!input || typeof input.remaining_minutes !== "number") throw new Error("Invalid input");
    return input;
  })
  .handler(async ({ data }): Promise<{ insights: RouteIntelligenceInsight[]; summary: string }> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { insights: [], summary: "CoPilot intelligence is offline." };
    }
    const system = [
      "You are Anderoute CoPilot route intelligence.",
      "Given a trucking trip snapshot, produce up to 4 short, actionable insights.",
      "Be specific and driver-safe. Each message must be under 18 words.",
      "Prioritize CDL hazards (low bridges, weight, hazmat) > weather > traffic > rest > fuel.",
      "Return ONLY via the route_intelligence tool.",
    ].join(" ");
    const body = {
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Trip snapshot: ${JSON.stringify(data)}` },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "route_intelligence",
            description: "Return route insights for the driver and dispatcher.",
            parameters: {
              type: "object",
              properties: {
                summary: { type: "string", maxLength: 200 },
                insights: {
                  type: "array",
                  maxItems: 4,
                  items: {
                    type: "object",
                    properties: {
                      insight_type: { type: "string", enum: ["traffic_risk","eta_risk","fuel_stop","rest_stop","cdl_hazard","weather"] },
                      severity: { type: "string", enum: ["info","warning","critical"] },
                      title: { type: "string", maxLength: 60 },
                      message: { type: "string", maxLength: 200 },
                      distance_ahead_m: { type: "number" },
                    },
                    required: ["insight_type","severity","title","message"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["summary","insights"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "route_intelligence" } },
    };
    const resp = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      if (resp.status === 429) throw new Error("Rate limit exceeded.");
      if (resp.status === 402) throw new Error("AI credits exhausted.");
      throw new Error("Route intelligence unavailable.");
    }
    const json = await resp.json();
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!call?.function?.arguments) return { insights: [], summary: "No insights." };
    return JSON.parse(call.function.arguments);
  });
