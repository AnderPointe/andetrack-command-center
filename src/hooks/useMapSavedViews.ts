import { useMemo } from "react";
import type { DispatchLayerKey } from "@/components/dispatch/AnderouteDispatchMap";

export interface SavedMapView {
  id: string;
  label: string;
  description?: string;
  center: [number, number]; // [lng, lat]
  zoom: number;
  pitch?: number;
  bearing?: number;
  layers?: DispatchLayerKey[];
}

const PRESET_VIEWS: SavedMapView[] = [
  {
    id: "us",
    label: "United States",
    description: "Continental view",
    center: [-98.5795, 39.8283],
    zoom: 3.5,
    pitch: 35,
  },
  {
    id: "tx",
    label: "Texas",
    description: "Statewide",
    center: [-99.9018, 31.9686],
    zoom: 5.5,
    pitch: 30,
  },
  {
    id: "dfw",
    label: "Dallas / Fort Worth",
    center: [-97.0336, 32.8998],
    zoom: 9.2,
    pitch: 45,
  },
  {
    id: "active",
    label: "Active Dispatch",
    description: "Drivers + loads",
    center: [-96.797, 32.7767],
    zoom: 6,
    layers: ["drivers", "loads", "pickups", "dropoffs", "geofences"],
  },
  {
    id: "all-drivers",
    label: "All Drivers",
    center: [-98.5795, 39.8283],
    zoom: 4,
    layers: ["drivers"],
  },
  {
    id: "alerts",
    label: "Alerts Only",
    center: [-98.5795, 39.8283],
    zoom: 4,
    layers: ["drivers", "geofences"],
  },
  {
    id: "warehouses",
    label: "Warehouses",
    center: [-95.3698, 29.7604],
    zoom: 5,
    layers: ["warehouses", "depots"],
  },
  {
    id: "airports",
    label: "Airports",
    center: [-104.6737, 39.8561],
    zoom: 4,
    layers: ["airports"],
  },
  {
    id: "truck-stops",
    label: "Truck Stops",
    center: [-97.5164, 35.4676],
    zoom: 5,
    layers: ["truck_stops", "fuel"],
  },
];

export function useMapSavedViews() {
  return useMemo(() => PRESET_VIEWS, []);
}
