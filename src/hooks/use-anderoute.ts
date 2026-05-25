import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/api/anderoute";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

// =============== Queries ===============
export const useProfile = () =>
  useQuery({ queryKey: ["profile"], queryFn: api.getMyProfile });

export const useDrivers = () =>
  useQuery({ queryKey: ["drivers"], queryFn: api.listDrivers });

export const useDriver = (id: string | undefined) =>
  useQuery({ queryKey: ["driver", id], queryFn: () => api.getDriver(id!), enabled: !!id });

export const useVehicles = () =>
  useQuery({ queryKey: ["vehicles"], queryFn: api.listVehicles });

export const useLoads = () =>
  useQuery({ queryKey: ["loads"], queryFn: api.listLoads });

export const useShipments = () =>
  useQuery({ queryKey: ["shipments"], queryFn: api.listShipments });

export const useRoutes = () =>
  useQuery({ queryKey: ["routes"], queryFn: api.listRoutes });

export const useRouteSteps = (routeId: string | undefined) =>
  useQuery({ queryKey: ["route_steps", routeId], queryFn: () => api.getRouteSteps(routeId!), enabled: !!routeId });

export const useAlerts = () =>
  useQuery({ queryKey: ["alerts"], queryFn: api.listAlerts });

export const useOffers = () =>
  useQuery({ queryKey: ["offers"], queryFn: api.listOffers });

// =============== Mutations ===============
export const useUpdateDriverStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Tables["drivers"]["Row"]["status"] }) =>
      api.updateDriverStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });
};

export const useAssignLoad = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ loadId, driverId, companyId }: { loadId: string; driverId: string; companyId: string }) =>
      api.assignLoad(loadId, driverId, companyId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loads"] });
      qc.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
};

export const useCreateLoad = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Tables["loads"]["Insert"]) => api.createLoad(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["loads"] }),
  });
};

export const useUpdateLoadStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Tables["loads"]["Row"]["status"] }) =>
      api.updateLoadStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["loads"] }),
  });
};

export const useRespondOffer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, response, denyReason }: { id: string; response: "accepted" | "denied"; denyReason?: string }) =>
      api.respondOffer(id, response, denyReason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["offers"] });
      qc.invalidateQueries({ queryKey: ["loads"] });
    },
  });
};

export const useResolveAlert = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.resolveAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
};

// =============== Realtime ===============
/**
 * Subscribes to postgres changes on a table for the user's company
 * and invalidates the matching query cache so React Query refetches.
 */
function useRealtimeTable(table: string, queryKey: unknown[]) {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel(`rt:${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        qc.invalidateQueries({ queryKey });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, JSON.stringify(queryKey)]);
}

export const useRealtimeDrivers = () => useRealtimeTable("drivers", ["drivers"]);
export const useRealtimeLoads = () => useRealtimeTable("loads", ["loads"]);
export const useRealtimeShipments = () => useRealtimeTable("shipments", ["shipments"]);
export const useRealtimeAlerts = () => useRealtimeTable("alerts", ["alerts"]);
export const useRealtimeOffers = () => useRealtimeTable("load_offers", ["offers"]);
export const useRealtimeDriverLocations = () => useRealtimeTable("driver_location_events", ["driver_locations"]);
export const useRealtimeDriverStatus = () => useRealtimeTable("driver_status_events", ["driver_status_events"]);
export const useRealtimeTelemetry = () => useRealtimeTable("telemetry", ["telemetry"]);

/** Convenience: subscribe to everything the dispatcher dashboard cares about. */
export function useRealtimeDispatch() {
  useRealtimeDrivers();
  useRealtimeLoads();
  useRealtimeShipments();
  useRealtimeAlerts();
  useRealtimeOffers();
  useRealtimeDriverLocations();
  useRealtimeTelemetry();
}

/** Convenience: subscribe to a single driver's live updates. */
export function useRealtimeDriverProfile() {
  useRealtimeDrivers();
  useRealtimeShipments();
  useRealtimeTelemetry();
  useRealtimeDriverLocations();
}
