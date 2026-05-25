import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";

export type GeofenceType =
  | "delivery"
  | "customer"
  | "yard"
  | "restricted"
  | "airport"
  | "port"
  | "warehouse";

export interface MapGeofence {
  id: string;
  name: string;
  type: GeofenceType;
  status: "active" | "inactive";
  center: [number, number]; // [lng, lat]
  radius_m: number;
  notes?: string;
}

export interface GeofenceInput {
  name: string;
  type: GeofenceType;
  status: "active" | "inactive";
  latitude: number;
  longitude: number;
  radius_m: number;
  notes?: string;
}

const DEMO_GEOFENCES: MapGeofence[] = [
  { id: "g-dal-yard", name: "Dallas Yard", type: "yard", status: "active", center: [-96.797, 32.7767], radius_m: 1200, notes: "Primary DFW yard" },
  { id: "g-dfw-air", name: "DFW Airport", type: "airport", status: "active", center: [-97.0403, 32.8998], radius_m: 4500 },
  { id: "g-lb-port", name: "Port of Long Beach", type: "port", status: "active", center: [-118.2165, 33.7542], radius_m: 3500 },
  { id: "g-atl-wh", name: "Atlanta DC Zone", type: "warehouse", status: "active", center: [-84.388, 33.749], radius_m: 1500 },
  { id: "g-chi-rest", name: "Chicago Downtown Restricted", type: "restricted", status: "active", center: [-87.6298, 41.8781], radius_m: 2500, notes: "No truck access 7a–7p" },
  { id: "g-hou-cust", name: "Houston Customer Hub", type: "customer", status: "active", center: [-95.3698, 29.7604], radius_m: 1800 },
];

function rowToGeofence(r: any): MapGeofence {
  return {
    id: r.id,
    name: r.name,
    type: r.type as GeofenceType,
    status: (r.status ?? "active") as "active" | "inactive",
    center: [Number(r.longitude), Number(r.latitude)],
    radius_m: Number(r.radius_m),
    notes: r.notes ?? undefined,
  };
}

export function useMapGeofences() {
  const { companyId } = useCurrentCompany();
  const [geofences, setGeofences] = useState<MapGeofence[]>(DEMO_GEOFENCES);
  const [loading, setLoading] = useState(false);
  const [usingDemo, setUsingDemo] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await (supabase as any)
        .from("logistics_map_geofences")
        .select("*")
        .order("name");
      if (error) throw error;
      if (data && data.length) {
        setGeofences(data.map(rowToGeofence));
        setUsingDemo(false);
      } else {
        // Table empty but accessible — show empty list (not demo) when logged in to a company
        if (companyId) {
          setGeofences([]);
          setUsingDemo(false);
        }
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to load geofences");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      await load();
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const create = useCallback(
    async (input: GeofenceInput): Promise<MapGeofence> => {
      if (!companyId) throw new Error("No company context — sign in first.");
      const { data, error } = await (supabase as any)
        .from("logistics_map_geofences")
        .insert({
          company_id: companyId,
          name: input.name,
          type: input.type,
          status: input.status,
          latitude: input.latitude,
          longitude: input.longitude,
          radius_m: input.radius_m,
          notes: input.notes ?? null,
        })
        .select("*")
        .single();
      if (error) throw error;
      const g = rowToGeofence(data);
      setGeofences((prev) => [...prev.filter((x) => x.id !== g.id), g].sort((a, b) => a.name.localeCompare(b.name)));
      setUsingDemo(false);
      return g;
    },
    [companyId],
  );

  const update = useCallback(async (id: string, input: GeofenceInput): Promise<MapGeofence> => {
    const { data, error } = await (supabase as any)
      .from("logistics_map_geofences")
      .update({
        name: input.name,
        type: input.type,
        status: input.status,
        latitude: input.latitude,
        longitude: input.longitude,
        radius_m: input.radius_m,
        notes: input.notes ?? null,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    const g = rowToGeofence(data);
    setGeofences((prev) => prev.map((x) => (x.id === id ? g : x)));
    return g;
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    const { error } = await (supabase as any)
      .from("logistics_map_geofences")
      .delete()
      .eq("id", id);
    if (error) throw error;
    setGeofences((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { geofences, loading, error, usingDemo, canEdit: !!companyId, reload: load, create, update, remove };
}
