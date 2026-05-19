/** Phase 7 — Mock data for enterprise UI surfaces (no DB writes required for demo). */
import type { CompanyIntegration, ConnectorCatalogItem, EdiTransaction } from "../types";

export const MOCK_CATALOG: ConnectorCatalogItem[] = [
  { id: "c1", key: "quickbooks", name: "QuickBooks", category: "accounting", vendor: "Intuit", description: "Sync invoices and customers", capabilities: ["invoices.export","customers.sync"] },
  { id: "c2", key: "samsara", name: "Samsara", category: "telematics", vendor: "Samsara", description: "Vehicle telematics + GPS", capabilities: ["gps.read","vehicles.sync"] },
  { id: "c3", key: "motive", name: "Motive", category: "telematics", vendor: "Motive", description: "ELD + HOS", capabilities: ["gps.read","hos.read"] },
  { id: "c4", key: "wex", name: "WEX Fuel Card", category: "fuel", vendor: "WEX", description: "Fuel transactions", capabilities: ["fuel.read"] },
  { id: "c5", key: "salesforce", name: "Salesforce", category: "crm", vendor: "Salesforce", description: "CRM sync", capabilities: ["customers.sync"] },
  { id: "c6", key: "twilio", name: "Twilio", category: "notifications", vendor: "Twilio", description: "SMS + voice", capabilities: ["sms.send"] },
  { id: "c7", key: "mapbox", name: "Mapbox", category: "maps", vendor: "Mapbox", description: "Maps + routing", capabilities: ["maps","routing"] },
  { id: "c8", key: "dat", name: "DAT Load Board", category: "broker", vendor: "DAT", description: "External load board", capabilities: ["loads.read"] },
  { id: "c9", key: "google_drive", name: "Google Drive", category: "document_storage", vendor: "Google", description: "Document storage", capabilities: ["docs.upload"] },
  { id: "c10", key: "netsuite", name: "NetSuite", category: "erp", vendor: "Oracle", description: "Enterprise ERP", capabilities: ["invoices.export"] },
  { id: "c11", key: "here", name: "HERE", category: "maps", vendor: "HERE", description: "Truck routing", capabilities: ["truck_routing"] },
  { id: "c12", key: "sendgrid", name: "SendGrid", category: "notifications", vendor: "Twilio", description: "Transactional email", capabilities: ["email.send"] },
];

export const MOCK_CONNECTED: CompanyIntegration[] = [
  { id: "ci1", connector_key: "samsara",    display_name: "Samsara (Production)", status: "connected", health: "healthy",  enabled: true, last_sync_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(), last_error: null },
  { id: "ci2", connector_key: "quickbooks", display_name: "QuickBooks Online",    status: "connected", health: "healthy",  enabled: true, last_sync_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(), last_error: null },
  { id: "ci3", connector_key: "twilio",     display_name: "Twilio SMS",           status: "connected", health: "warning",  enabled: true, last_sync_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), last_error: "Rate limit warning (78% of quota)" },
  { id: "ci4", connector_key: "wex",        display_name: "WEX Fuel Card",        status: "error",     health: "failed",   enabled: true, last_sync_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), last_error: "Auth token expired" },
];

export const MOCK_EDI_TX: EdiTransaction[] = [
  { id: "edi1", partner_name: "ACME Brokerage", transaction_type: "204", direction: "inbound",  status: "processed",    control_number: "CN-48211", related_load_id: "L-2041", received_at: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: "edi2", partner_name: "ACME Brokerage", transaction_type: "990", direction: "outbound", status: "acknowledged", control_number: "CN-48211", related_load_id: "L-2041", received_at: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: "edi3", partner_name: "FastShip Inc",   transaction_type: "214", direction: "outbound", status: "acknowledged", control_number: "CN-48212", related_load_id: "L-2038", received_at: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: "edi4", partner_name: "MegaCorp Logistics", transaction_type: "204", direction: "inbound", status: "error", control_number: "CN-48213", error_message: "Unmapped field: SHIP_TO_QUALIFIER", received_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { id: "edi5", partner_name: "ACME Brokerage", transaction_type: "210", direction: "outbound", status: "processed",    control_number: "CN-48214", related_load_id: "L-2036", received_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];
