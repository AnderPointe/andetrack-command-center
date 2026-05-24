import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DispatchLoad, LoadStop } from "@/types/loads";

// Mock fallback so the dispatch map demos cleanly when there are no real loads.
const MOCK_LOADS: DispatchLoad[] = [
  {
    id: "mock-load-1",
    company_id: "demo",
    pickup_location: "Seattle, WA",
    dropoff_location: "Miami, FL",
    commodity: "Electronics",
    status: "in_progress",
    customer: "Acme Corp",
    rate: 4850,
    weight: 28500,
    assigned_driver_id: null,
    pickup_window: "Today 09:00 – 12:00",
    delivery_window: "Fri 14:00 – 18:00",
    stops: [
      {
        id: "mock-stop-1a",
        load_id: "mock-load-1",
        company_id: "demo",
        kind: "pickup",
        sequence: 0,
        name: "Seattle DC",
        address: "1000 Alaskan Way",
        city: "Seattle",
        region: "WA",
        postal_code: "98104",
        country: "US",
        latitude: 47.6062,
        longitude: -122.3321,
        scheduled_arrival: null,
        scheduled_departure: null,
        actual_arrival: null,
        actual_departure: null,
        contact_name: "Sam Ortiz",
        contact_phone: "+1 206 555 0142",
        instructions: "Dock 4 · check in at security",
        status: "pending",
      },
      {
        id: "mock-stop-1b",
        load_id: "mock-load-1",
        company_id: "demo",
        kind: "dropoff",
        sequence: 1,
        name: "Miami Hub",
        address: "200 NW 7th St",
        city: "Miami",
        region: "FL",
        postal_code: "33136",
        country: "US",
        latitude: 25.7617,
        longitude: -80.1918,
        scheduled_arrival: null,
        scheduled_departure: null,
        actual_arrival: null,
        actual_departure: null,
        contact_name: "Lena Park",
        contact_phone: "+1 305 555 0177",
        instructions: "Appointment delivery",
        status: "pending",
      },
    ],
  },
];

export function useLoadsWithStops() {
  const [loads, setLoads] = useState<DispatchLoad[]>(MOCK_LOADS);
  const [usingMock, setUsingMock] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchLoads() {
      try {
        const { data: loadRows, error: loadErr } = await (supabase as any)
          .from("loads")
          .select(
            "id, company_id, pickup_location, dropoff_location, commodity, status, customer, rate, weight, assigned_driver_id, pickup_window, delivery_window"
          )
          .order("created_at", { ascending: false })
          .limit(100);
        if (cancelled || loadErr || !loadRows?.length) return;

        const ids = loadRows.map((l: any) => l.id);
        const { data: stopRows } = await (supabase as any)
          .from("load_stops")
          .select("*")
          .in("load_id", ids)
          .order("sequence", { ascending: true });

        const stopsByLoad = new Map<string, LoadStop[]>();
        (stopRows ?? []).forEach((s: LoadStop) => {
          const arr = stopsByLoad.get(s.load_id) ?? [];
          arr.push(s);
          stopsByLoad.set(s.load_id, arr);
        });

        const merged: DispatchLoad[] = loadRows.map((l: any) => ({
          ...l,
          stops: stopsByLoad.get(l.id) ?? [],
        }));
        if (!cancelled) {
          setLoads(merged);
          setUsingMock(false);
        }
      } catch {
        /* keep mock fallback */
      }
    }

    fetchLoads();

    const channel = supabase
      .channel("dispatch-loads")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loads" },
        fetchLoads
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "load_stops" },
        fetchLoads
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { loads, usingMock };
}
