/**
 * Anderoute API helpers — thin wrappers around the Supabase client
 * for company-scoped reads/writes. All RLS-scoped to the user's company.
 */
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
export type DriverRow = Tables["drivers"]["Row"];
export type VehicleRow = Tables["vehicles"]["Row"];
export type LoadRow = Tables["loads"]["Row"];
export type ShipmentRow = Tables["shipments"]["Row"];
export type RouteRow = Tables["routes"]["Row"];
export type RouteStepRow = Tables["route_steps"]["Row"];
export type AlertRow = Tables["alerts"]["Row"];
export type LoadOfferRow = Tables["load_offers"]["Row"];
export type DispatchAssignmentRow = Tables["dispatch_assignments"]["Row"];
export type DriverLocationEventRow = Tables["driver_location_events"]["Row"];
export type DriverStatusEventRow = Tables["driver_status_events"]["Row"];
export type ProofOfDeliveryRow = Tables["proof_of_delivery"]["Row"];
export type ProfileRow = Tables["profiles"]["Row"];
export type CompanyRow = Tables["companies"]["Row"];

async function unwrap<T>(p: PromiseLike<{ data: T | null; error: { message: string } | null }>): Promise<T> {
  const { data, error } = await p;
  if (error) throw new Error(error.message);
  return data as T;
}

export const api = {
  // Profile / company
  async getMyProfile(): Promise<ProfileRow | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },
  async getCompany(id: string): Promise<CompanyRow | null> {
    const { data, error } = await supabase.from("companies").select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  // Drivers
  listDrivers: () => unwrap(supabase.from("drivers").select("*").order("name")),
  getDriver: (id: string) => unwrap(supabase.from("drivers").select("*").eq("id", id).maybeSingle()),
  updateDriverStatus: (id: string, status: DriverRow["status"]) =>
    unwrap(supabase.from("drivers").update({ status, last_updated: new Date().toISOString() }).eq("id", id).select().maybeSingle()),
  updateDriverLocation: (id: string, lat: number, lng: number, label?: string, speed?: number) =>
    unwrap(
      supabase
        .from("drivers")
        .update({
          current_lat: lat,
          current_lng: lng,
          current_location_label: label,
          current_speed: speed,
          last_updated: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .maybeSingle(),
    ),

  // Vehicles
  listVehicles: () => unwrap(supabase.from("vehicles").select("*").order("unit_number")),

  // Loads
  listLoads: () => unwrap(supabase.from("loads").select("*").order("created_at", { ascending: false })),
  getLoad: (id: string) => unwrap(supabase.from("loads").select("*").eq("id", id).maybeSingle()),
  createLoad: (input: Tables["loads"]["Insert"]) =>
    unwrap(supabase.from("loads").insert(input).select().maybeSingle()),
  updateLoadStatus: (id: string, status: LoadRow["status"]) =>
    unwrap(supabase.from("loads").update({ status }).eq("id", id).select().maybeSingle()),
  assignLoad: async (loadId: string, driverId: string, companyId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    await unwrap(
      supabase.from("dispatch_assignments").insert({
        company_id: companyId,
        load_id: loadId,
        driver_id: driverId,
        assigned_by: user?.id ?? null,
      }).select().maybeSingle(),
    );
    return unwrap(
      supabase.from("loads").update({ assigned_driver_id: driverId, status: "assigned" }).eq("id", loadId).select().maybeSingle(),
    );
  },

  // Shipments
  listShipments: () => unwrap(supabase.from("shipments").select("*").order("created_at", { ascending: false })),

  // Routes
  listRoutes: () => unwrap(supabase.from("routes").select("*")),
  getRouteSteps: (routeId: string) =>
    unwrap(supabase.from("route_steps").select("*").eq("route_id", routeId).order("step_order")),

  // Load offers
  listOffers: () => unwrap(supabase.from("load_offers").select("*").order("created_at", { ascending: false })),
  createOffer: (input: Tables["load_offers"]["Insert"]) =>
    unwrap(supabase.from("load_offers").insert(input).select().maybeSingle()),
  respondOffer: (id: string, response: "accepted" | "denied", denyReason?: string) =>
    unwrap(
      supabase.from("load_offers").update({
        response, responded_at: new Date().toISOString(), deny_reason: denyReason,
      }).eq("id", id).select().maybeSingle(),
    ),

  // Alerts
  listAlerts: () => unwrap(supabase.from("alerts").select("*").order("created_at", { ascending: false })),
  resolveAlert: async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    return unwrap(
      supabase.from("alerts").update({
        resolved: true, resolved_at: new Date().toISOString(), resolved_by: user?.id ?? null,
      }).eq("id", id).select().maybeSingle(),
    );
  },

  // Driver events
  insertLocationEvent: (input: Tables["driver_location_events"]["Insert"]) =>
    unwrap(supabase.from("driver_location_events").insert(input).select().maybeSingle()),
  insertStatusEvent: (input: Tables["driver_status_events"]["Insert"]) =>
    unwrap(supabase.from("driver_status_events").insert(input).select().maybeSingle()),
  listRecentLocations: (driverId: string, limit = 50) =>
    unwrap(supabase.from("driver_location_events").select("*").eq("driver_id", driverId).order("recorded_at", { ascending: false }).limit(limit)),

  // POD
  uploadPOD: (input: Tables["proof_of_delivery"]["Insert"]) =>
    unwrap(supabase.from("proof_of_delivery").insert(input).select().maybeSingle()),

  /**
   * Upload a POD file (signature image or photo) to the private storage bucket
   * `proof-of-delivery`. Files are stored under `{company_id}/{load_id}/...`
   * so RLS policies on storage.objects can scope access by company.
   */
  uploadPODFile: async (
    companyId: string,
    loadId: string,
    file: Blob,
    kind: "signature" | "photo",
    ext = "png",
  ): Promise<{ path: string; signedUrl: string | null }> => {
    const path = `${companyId}/${loadId}/${kind}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("proof-of-delivery")
      .upload(path, file, { contentType: file.type || `image/${ext}`, upsert: false });
    if (error) throw new Error(error.message);
    const { data: signed } = await supabase.storage
      .from("proof-of-delivery")
      .createSignedUrl(path, 60 * 60 * 24 * 7); // 7d
    return { path, signedUrl: signed?.signedUrl ?? null };
  },
};

