export type LoadStopKind = "pickup" | "dropoff";

export type LoadStopStatus =
  | "pending"
  | "en_route"
  | "arrived"
  | "completed"
  | "skipped";

export interface LoadStop {
  id: string;
  load_id: string;
  company_id: string;
  kind: LoadStopKind;
  sequence: number;
  name: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  scheduled_arrival: string | null;
  scheduled_departure: string | null;
  actual_arrival: string | null;
  actual_departure: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  instructions: string | null;
  status: LoadStopStatus;
}

export interface DispatchLoad {
  id: string;
  company_id: string;
  load_number?: string | null;
  pickup_location: string;
  dropoff_location: string;
  commodity: string | null;
  status: string;
  customer: string | null;
  rate: number | null;
  weight: number | null;
  assigned_driver_id: string | null;
  pickup_window: string | null;
  delivery_window: string | null;
  stops: LoadStop[];
}
