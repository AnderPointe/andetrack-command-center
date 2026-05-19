/** Phase 7 — Enterprise integration shared types. */
export type IntegrationCategory =
  | "edi" | "rest_api" | "webhooks" | "accounting" | "tms" | "broker"
  | "shipper_portal" | "customer_system" | "fuel" | "maintenance"
  | "telematics" | "maps" | "ai_provider" | "notifications"
  | "document_storage" | "data_io" | "crm" | "erp";

export type IntegrationHealth = "healthy" | "warning" | "degraded" | "failed" | "unknown" | "disabled";

export interface ConnectorCatalogItem {
  id: string;
  key: string;
  name: string;
  category: IntegrationCategory;
  vendor?: string;
  description?: string;
  capabilities: string[];
}

export interface CompanyIntegration {
  id: string;
  connector_key: string;
  display_name: string;
  status: "connected" | "disconnected" | "error" | "pending";
  health: IntegrationHealth;
  last_sync_at?: string | null;
  last_error?: string | null;
  enabled: boolean;
}

export type EdiTransactionType = "204" | "990" | "214" | "210" | "211" | "212" | "997" | "856";

export interface EdiTransaction {
  id: string;
  partner_name?: string;
  transaction_type: EdiTransactionType;
  direction: "inbound" | "outbound";
  status: "received" | "parsed" | "processed" | "acknowledged" | "rejected" | "error";
  control_number?: string;
  related_load_id?: string | null;
  received_at?: string;
  error_message?: string | null;
}

export type ApiScope =
  | "loads.read" | "loads.write" | "shipments.read" | "shipments.write"
  | "drivers.read" | "vehicles.read" | "tracking.read" | "tracking.write"
  | "pod.read" | "pod.write" | "invoices.read" | "invoices.write"
  | "customers.read" | "customers.write" | "alerts.read" | "alerts.write"
  | "webhooks.manage";

export const ALL_API_SCOPES: ApiScope[] = [
  "loads.read","loads.write","shipments.read","shipments.write",
  "drivers.read","vehicles.read","tracking.read","tracking.write",
  "pod.read","pod.write","invoices.read","invoices.write",
  "customers.read","customers.write","alerts.read","alerts.write","webhooks.manage",
];

export type WebhookEvent =
  | "load.created" | "load.offered" | "load.accepted" | "load.denied"
  | "load.assigned" | "load.cancelled"
  | "shipment.created" | "shipment.in_transit" | "shipment.delayed" | "shipment.delivered"
  | "eta.updated" | "driver.arrived_pickup" | "driver.loaded" | "driver.arrived_dropoff"
  | "proof_of_delivery.submitted" | "invoice.created" | "invoice.paid"
  | "alert.created" | "alert.resolved";

export const ALL_WEBHOOK_EVENTS: WebhookEvent[] = [
  "load.created","load.offered","load.accepted","load.denied","load.assigned","load.cancelled",
  "shipment.created","shipment.in_transit","shipment.delayed","shipment.delivered",
  "eta.updated","driver.arrived_pickup","driver.loaded","driver.arrived_dropoff",
  "proof_of_delivery.submitted","invoice.created","invoice.paid","alert.created","alert.resolved",
];

export interface SuggestedAssignment {
  loadId: string;
  loadLabel: string;
  driverId: string;
  driverName: string;
  matchScore: number;
  deadheadMiles: number;
  etaToPickupMin: number;
  vehicleMatch: boolean;
  cdlMatch: boolean;
  riskScore: number;
  estimatedFuelCost: number;
  onTimeProbability: number;
  explanation: string;
}

export interface RateQuoteInput {
  miles: number;
  vehicleType?: string;
  weight?: number;
  urgency?: "standard" | "expedited" | "team";
  commodity?: string;
  customerId?: string;
  hazmat?: boolean;
  afterHours?: boolean;
}

export interface RateQuoteResult {
  baseRate: number;
  fuelSurcharge: number;
  accessorials: { label: string; amount: number }[];
  total: number;
  driverPayEstimate: number;
  marginPct: number;
}
