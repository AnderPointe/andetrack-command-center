import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type DriverProfilePayload = {
  driver: {
    id: string;
    name: string;
    photo_url: string | null;
    phone: string | null;
    status: string;
    current_lat: number | null;
    current_lng: number | null;
    speed_mph: number | null;
    last_seen_at: string | null;
  };
  shipment: {
    id: string;
    cargo_type: string | null;
    hauling_description: string | null;
    pickup_address: string | null;
    dropoff_address: string | null;
    eta_minutes: number | null;
    route_progress: number | null;
    capacity_percent: number | null;
    weight: number | null;
    volume: number | null;
    quantity: number | null;
    quantity_unit: string | null;
    is_hazardous: boolean;
    is_temperature_controlled: boolean;
    package_type: string | null;
    scheduled_arrival_at: string | null;
    delay_minutes: number | null;
  } | null;
  vehicle: {
    unit_number: string;
    make: string | null;
    model: string | null;
    plate: string | null;
    fuel_level: number | null;
    telemetry_status: string | null;
    mileage: number | null;
    battery_level: number | null;
    engine_status: string | null;
    temperature_f: number | null;
    signal_strength: number | null;
    driver_app_status: string | null;
  } | null;
};

export const getDriverProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ driverId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }): Promise<DriverProfilePayload> => {
    const { supabase } = context;

    const { data: driver, error: driverErr } = await supabase
      .from("drivers")
      .select(
        "id, name, photo_url, phone, status, current_lat, current_lng, current_speed, last_updated, active_shipment_id, vehicle_id",
      )
      .eq("id", data.driverId)
      .maybeSingle();

    if (driverErr) throw new Error(driverErr.message);
    if (!driver) throw new Error("Driver not found");

    const { data: live } = await supabase
      .from("driver_live_state")
      .select(
        "current_latitude, current_longitude, speed_mph, last_location_at, eta_minutes, route_progress_pct, active_shipment_id",
      )
      .eq("driver_id", driver.id)
      .maybeSingle();

    const shipmentId = live?.active_shipment_id ?? driver.active_shipment_id;

    let shipment: DriverProfilePayload["shipment"] = null;
    if (shipmentId) {
      const { data: s } = await supabase
        .from("shipments")
        .select(
          "id, cargo_type, commodity, hauling_description, pickup_address, dropoff_address, eta_minutes, route_progress, capacity_percent, weight, volume, quantity, quantity_unit, is_hazardous, is_temperature_controlled, package_type, scheduled_arrival_at, delay_minutes",
        )
        .eq("id", shipmentId)
        .maybeSingle();
      if (s) {
        shipment = {
          id: s.id,
          cargo_type: s.cargo_type ?? s.commodity ?? null,
          hauling_description: s.hauling_description,
          pickup_address: s.pickup_address,
          dropoff_address: s.dropoff_address,
          eta_minutes: live?.eta_minutes ?? s.eta_minutes ?? null,
          route_progress:
            (live?.route_progress_pct as number | null) ?? s.route_progress ?? null,
          capacity_percent: s.capacity_percent,
          weight: s.weight,
          volume: s.volume,
          quantity: s.quantity,
          quantity_unit: s.quantity_unit,
          is_hazardous: s.is_hazardous ?? false,
          is_temperature_controlled: s.is_temperature_controlled ?? false,
          package_type: s.package_type,
          scheduled_arrival_at: s.scheduled_arrival_at ?? null,
          delay_minutes: s.delay_minutes ?? null,
        };
      }
    }

    let vehicle: DriverProfilePayload["vehicle"] = null;
    if (driver.vehicle_id) {
      const { data: v } = await supabase
        .from("vehicles")
        .select(
          "unit_number, make, model, plate, fuel_level, telemetry_status, mileage, battery_level, engine_status, temperature_f, signal_strength, driver_app_status",
        )
        .eq("id", driver.vehicle_id)
        .maybeSingle();
      if (v) vehicle = v;
    }

    return {
      driver: {
        id: driver.id,
        name: driver.name,
        photo_url: driver.photo_url,
        phone: driver.phone,
        status: driver.status,
        current_lat: (live?.current_latitude as number | null) ?? driver.current_lat,
        current_lng: (live?.current_longitude as number | null) ?? driver.current_lng,
        speed_mph:
          (live?.speed_mph as number | null) ??
          (driver.current_speed as number | null),
        last_seen_at:
          (live?.last_location_at as string | null) ?? driver.last_updated,
      },
      shipment,
      vehicle,
    };
  });
