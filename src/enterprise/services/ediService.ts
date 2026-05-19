/** Phase 7 — EDI service placeholder.
 *  Production: integrate with an EDI VAN/translator (e.g., MuleSoft, OpenText, Cleo).
 *  This module only defines clean interfaces + mock parse/build helpers.
 */
import type { EdiTransactionType } from "../types";

export interface ParsedEdi204 {
  control_number: string;
  shipment_id: string;
  pickup: { location: string; window: string };
  delivery: { location: string; window: string };
  commodity?: string;
  weight?: number;
  requires_cdl?: boolean;
  requires_hazmat?: boolean;
  partner_ref?: string;
}

/** Mock parser — in production, use a real X12 parser. */
export function parseEdi204(raw: string): ParsedEdi204 {
  // raw is ignored in mock; returns a deterministic sample
  return {
    control_number: `CN-${Math.floor(Math.random() * 99999)}`,
    shipment_id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
    pickup: { location: "Dallas, TX 75201", window: "Tue 08:00-12:00" },
    delivery: { location: "Houston, TX 77002", window: "Tue 16:00-20:00" },
    commodity: "General freight",
    weight: 28500,
    requires_cdl: true,
    requires_hazmat: false,
    partner_ref: raw.slice(0, 16) || "MOCK-PARTNER",
  };
}

/** Mock builder for outbound EDI. */
export function buildEdi(type: EdiTransactionType, payload: Record<string, unknown>): string {
  return `ISA*00*...*ZZ*ANDEROUTE~GS*${type}*...~ST*${type}*0001~` +
    Object.entries(payload).map(([k, v]) => `${k.toUpperCase()}*${String(v)}`).join("~") +
    `~SE*X*0001~GE*1*1~IEA*1*000000001~`;
}

export function buildAck997(controlNumber: string, accepted = true): string {
  return buildEdi("997", { ack_control_number: controlNumber, status: accepted ? "A" : "R" });
}

export function buildResponse990(controlNumber: string, accepted: boolean, reason?: string): string {
  return buildEdi("990", { ack_control_number: controlNumber, decision: accepted ? "A" : "D", reason: reason ?? "" });
}

export function buildStatus214(loadId: string, status: string, lat?: number, lng?: number): string {
  return buildEdi("214", { load: loadId, status, lat: lat ?? "", lng: lng ?? "" });
}
