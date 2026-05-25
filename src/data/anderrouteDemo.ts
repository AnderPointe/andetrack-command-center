import type { DriverDossier } from "@/types/anderroute";

const now = new Date().toISOString();

export const DEMO_DOSSIER: DriverDossier = {
  driver: {
    id: "AR-00346582",
    company_id: "company-anderroute",
    user_id: "user-marcus",
    name: "Marcus Anderson",
    role: "Lead Courier Driver",
    photo_url:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
    phone: "(555) 555-0132",
    status: "en_route",
    current_lat: 32.85,
    current_lng: -97.1,
    speed_mph: 45,
    bearing: 92,
    last_seen_at: now,
    vehicle_id: "UNIT-4512",
  },
  vehicle: {
    id: "UNIT-4512",
    company_id: "company-anderroute",
    unit_number: "UNIT-4512",
    make: "Hyundai",
    model: "HD320",
    type: "Cargo Truck",
    plate: "TX-AR4512",
    fuel_level: 57,
    battery_level: 92,
    engine_status: "Nominal",
    temperature_status: "Cool — 38°F cabin",
  },
  shipment: {
    id: "SHP-228841",
    company_id: "company-anderroute",
    driver_id: "AR-00346582",
    vehicle_id: "UNIT-4512",
    cargo_type: "Priority Medical & Mixed Freight",
    hauling_description:
      "Priority medical supplies, boxed freight, route-sensitive parcels, and same-day delivery cargo.",
    pickup_address: "Fort Worth, TX",
    pickup_lat: 32.7555,
    pickup_lng: -97.3308,
    dropoff_address: "Dallas, TX",
    dropoff_lat: 32.7767,
    dropoff_lng: -96.797,
    eta_minutes: 44,
    scheduled_arrival: "12:12 PM",
    arrival_status: "on_time",
    priority: "high",
    space_used_percent: 88,
    capacity_used_percent: 82,
    weight: 7260,
    volume: 382.45,
    route_progress_percent: 71,
    status: "En Route",
  },
  manifest: {
    id: "MAN-228841",
    shipment_id: "SHP-228841",
    category: "Medical / Mixed Freight",
    item_count: 184,
    weight: 7260,
    volume: 382.45,
    special_handling_notes:
      "Keep upright. Fragile temperature-sensitive vials on Pallet A. Signature required at delivery.",
    temperature_requirement: "36–46°F (refrigerated)",
    hazmat: false,
    priority: "high",
  },
};

export const DEMO_DRIVERS: DriverDossier[] = [
  DEMO_DOSSIER,
  {
    ...DEMO_DOSSIER,
    driver: {
      ...DEMO_DOSSIER.driver,
      id: "AR-00347104",
      name: "Elena Cruz",
      role: "Freight Driver",
      photo_url:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      status: "delivering",
      speed_mph: 0,
      current_lat: 32.9,
      current_lng: -96.85,
    },
    shipment: {
      ...DEMO_DOSSIER.shipment,
      id: "SHP-228902",
      driver_id: "AR-00347104",
      cargo_type: "Retail Freight",
      hauling_description: "Pallets of retail goods inbound to distribution hub.",
      route_progress_percent: 96,
      eta_minutes: 4,
      arrival_status: "on_time",
      priority: "standard",
    },
  },
  {
    ...DEMO_DOSSIER,
    driver: {
      ...DEMO_DOSSIER.driver,
      id: "AR-00347550",
      name: "Jamal Brooks",
      role: "Hotshot Driver",
      photo_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      status: "delayed",
      speed_mph: 12,
      current_lat: 32.7,
      current_lng: -97.0,
    },
    shipment: {
      ...DEMO_DOSSIER.shipment,
      id: "SHP-228977",
      driver_id: "AR-00347550",
      cargo_type: "Industrial Parts",
      hauling_description: "Heavy industrial parts — delayed by traffic on I-35.",
      route_progress_percent: 42,
      eta_minutes: 88,
      arrival_status: "delayed",
      priority: "critical",
    },
  },
];

export function getDossierById(id: string): DriverDossier | undefined {
  return DEMO_DRIVERS.find((d) => d.driver.id === id);
}
