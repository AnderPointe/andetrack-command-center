/**
 * Phase 5 (polished) — Role-scoped tool registry for Anderoute CoPilot.
 *
 * Tools are *declared* here. Execution lives in domain services
 * (navigation, dispatch, POD). The registry only decides which tools
 * a given role/mode is allowed to call, so the provider can advertise
 * a safe subset to the model.
 */
import type { CopilotMode, CopilotRole } from "./types";

export interface ToolSpec {
  name: string;
  description: string;
  /** JSON-schema-ish; providers may translate to OpenAI tool schema. */
  parameters: Record<string, unknown>;
}

export const TOOLS: Record<string, ToolSpec> = {
  get_current_eta:        { name: "get_current_eta",        description: "Current ETA for the active load.", parameters: {} },
  get_remaining_miles:    { name: "get_remaining_miles",    description: "Remaining miles to next stop.",     parameters: {} },
  get_next_turn:          { name: "get_next_turn",          description: "Description of the next maneuver.", parameters: {} },
  get_load_details:       { name: "get_load_details",       description: "Details for a load by id.",         parameters: { load_id: "string" } },
  get_shipment_details:   { name: "get_shipment_details",   description: "Details for a shipment by id.",     parameters: { shipment_id: "string" } },
  update_driver_status:   { name: "update_driver_status",   description: "Change own status (on_duty/loaded/delivered/delayed).", parameters: { status: "string", note: "string?" } },
  report_delay:           { name: "report_delay",           description: "Report a delay with reason + minutes.", parameters: { reason: "string", minutes: "number" } },
  contact_dispatch:       { name: "contact_dispatch",       description: "Send a short voice/text message to dispatch.", parameters: { message: "string" } },
  create_dispatch_note:   { name: "create_dispatch_note",   description: "Dispatcher-only: attach a note to a load.", parameters: { load_id: "string", note: "string" } },
  create_alert:           { name: "create_alert",           description: "Dispatcher-only: raise an alert.",  parameters: { severity: "string", message: "string" } },
  request_reroute:        { name: "request_reroute",        description: "Ask navigation to recompute the route.", parameters: { reason: "string?" } },
  get_truck_route_validation: { name: "get_truck_route_validation", description: "Run CDL/truck validation on the active route.", parameters: {} },
  start_proof_of_delivery: { name: "start_proof_of_delivery", description: "Open POD capture flow.",          parameters: {} },
  queue_offline_action:   { name: "queue_offline_action",   description: "Queue an action while offline.",    parameters: { action: "string" } },
};

const DRIVER_TOOLS = [
  "get_current_eta", "get_remaining_miles", "get_next_turn",
  "get_load_details", "get_shipment_details",
  "update_driver_status", "report_delay", "contact_dispatch",
  "request_reroute", "get_truck_route_validation",
  "start_proof_of_delivery", "queue_offline_action",
];

const DISPATCHER_TOOLS = [
  "get_current_eta", "get_remaining_miles",
  "get_load_details", "get_shipment_details",
  "create_dispatch_note", "create_alert", "contact_dispatch",
];

const ADMIN_TOOLS = [...DISPATCHER_TOOLS];

export function allowedTools(role: CopilotRole, mode: CopilotMode): string[] {
  // In emergency mode shrink to safety-critical tools regardless of role.
  if (mode === "emergency") return ["contact_dispatch", "create_alert", "report_delay"];
  // Moving drivers can't trigger heavy / confirmation-required flows.
  if (mode === "driver_moving") {
    return DRIVER_TOOLS.filter((n) => n !== "start_proof_of_delivery");
  }
  switch (role) {
    case "driver":     return DRIVER_TOOLS;
    case "dispatcher": return DISPATCHER_TOOLS;
    case "admin":      return ADMIN_TOOLS;
  }
}
