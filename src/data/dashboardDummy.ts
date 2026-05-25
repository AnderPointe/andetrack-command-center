import type {
  Driver,
  RouteGeo,
  Shipment,
  Telemetry,
} from "@/types/dashboard";

export const dummyDriver: Driver = {
  id: "DRV-00421",
  name: "Marcus Hale",
  role: "Senior Long-Haul Driver",
  photo_url:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  phone: "+1 (512) 555-0142",
  status: "en_route",
};

export const dummyShipment: Shipment = {
  id: "SHP-9F2C18",
  cargo_type: "Refrigerated Medical Supplies",
  vehicle_type: "53' Reefer Trailer",
  weight_kg: 12450,
  capacity_percent: 78,
  volume_cuft: 2840,
  space_utilization_percent: 84,
  pickup_address: "Austin Distribution Hub, TX",
  dropoff_address: "Dallas Mercy Hospital, TX",
  eta_minutes: 96,
  scheduled_arrival_at: new Date(Date.now() + 96 * 60_000).toISOString(),
  route_progress: 62,
  trip_status: "on_time",
};

export const dummyTelemetry: Telemetry = {
  speed_mph: 64,
  fuel_percent: 71,
  battery_percent: 88,
  signal_percent: 92,
};

export const dummyRoute: RouteGeo = {
  pickup: { lat: 30.2672, lng: -97.7431 },
  dropoff: { lat: 32.7767, lng: -96.797 },
  current: { lat: 31.4, lng: -97.2 },
};
