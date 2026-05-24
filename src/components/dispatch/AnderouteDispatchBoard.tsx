/**
 * AnderouteDispatchBoard
 *
 * Anderoute Dispatch Board → Map View.
 *
 * Architecture:
 *   ┌────┬──────────────────────────────────────────────┐
 *   │ Nav│  DispatchTopBar       (64px)                  │
 *   │    ├──────────────────────────────────────────────┤
 *   │ 76 │  DispatchViewControls (56px)                  │
 *   │    ├──────────────────────────────────────────────┤
 *   │ px │  DispatchFilterBar    (48px)                  │
 *   │    ├──────────────┬───────────────────────────────┤
 *   │    │ Fleet (320)  │  AnderouteDispatchMap         │
 *   └────┴──────────────┴───────────────────────────────┘
 *
 * Safety:
 *  - Browser uses VITE_SUPABASE_ANON_KEY only (via shared client).
 *  - RLS must remain enabled on driver_location_current.
 *  - All assign/dispatch actions are human-approved (no autonomous dispatch).
 *  - Public OSM tiles are dev-grade; swap for self-hosted in production.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type Map as MLMap } from "maplibre-gl";
import { DispatchSidebarNav } from "./DispatchSidebarNav";
import { DispatchTopBar } from "./DispatchTopBar";
import { DispatchViewControls } from "./DispatchViewControls";
import { DispatchFilterBar } from "./DispatchFilterBar";
import { FleetDriverList } from "./FleetDriverList";
import { AnderouteDispatchMap } from "./AnderouteDispatchMap";
import { LoadsDispatchPanel } from "./LoadsDispatchPanel";
import { useLiveDriverCurrent } from "@/hooks/useLiveDriverLocations";
import { useLogisticsMapPois } from "@/hooks/useLogisticsMapPois";
import { useLoadsWithStops } from "@/hooks/useLoadsWithStops";
import { MOCK_DISPATCH_DRIVERS } from "@/data/mockDispatchDrivers";
import type { DispatchDriver, ViewMode } from "@/types/dispatch";
import type { DispatchLoad } from "@/types/loads";
import { STALE_AFTER_SECONDS } from "./dispatchTokens";

export default function AnderouteDispatchBoard() {
  const { drivers: liveDrivers, connected } = useLiveDriverCurrent();
  const pois = useLogisticsMapPois();
  const { loads, usingMock: loadsUsingMock } = useLoadsWithStops();
  const mapRef = useRef<MLMap | null>(null);

  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [driverStatusFilter, setDriverStatusFilter] = useState("all");
  const [loadStatusFilter, setLoadStatusFilter] = useState("all");
  const [loadTypeFilter, setLoadTypeFilter] = useState("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all");
  const [view, setView] = useState<ViewMode>("map");
  const [date, setDate] = useState(() => new Date());
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);

  // Mock fallback ONLY when Supabase has no rows
  const sourceDrivers: DispatchDriver[] = useMemo(() => {
    if (liveDrivers.length > 0) {
      // Mark drivers offline if last_ping_at > 120s old
      const now = Date.now();
      return liveDrivers.map((d) => {
        const age = (now - new Date(d.last_ping_at).getTime()) / 1000;
        return {
          ...d,
          status: age > STALE_AFTER_SECONDS ? "offline" : d.status,
        } as DispatchDriver;
      });
    }
    return MOCK_DISPATCH_DRIVERS;
  }, [liveDrivers]);

  const filteredDrivers = useMemo(() => {
    const q = (search + " " + filterSearch).trim().toLowerCase();
    return sourceDrivers.filter((d) => {
      if (driverStatusFilter !== "all" && d.status !== driverStatusFilter) return false;
      if (
        vehicleTypeFilter !== "all" &&
        (d.vehicle_type ?? "").toLowerCase().replace(/\s+/g, "_") !== vehicleTypeFilter
      )
        return false;
      if (!q) return true;
      return [
        d.driver_name,
        d.unit_number,
        d.current_load_number,
        d.city,
        d.vehicle_type,
      ]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [sourceDrivers, search, filterSearch, driverStatusFilter, vehicleTypeFilter]);

  const onCenter = (d: DispatchDriver) => {
    mapRef.current?.flyTo({
      center: [d.longitude, d.latitude],
      zoom: 12,
      pitch: 55,
      duration: 1000,
    });
    setSelectedDriverId(d.driver_id);
  };

  const onCall = (d: DispatchDriver) => {
    // Hook into dialer / Twilio later. For now: no-op.
    console.info("[dispatch] call requested", d.driver_id);
  };

  const filteredLoads = useMemo(() => {
    const q = (search + " " + filterSearch).trim().toLowerCase();
    return loads.filter((l) => {
      if (loadStatusFilter !== "all" && l.status !== loadStatusFilter) return false;
      if (!q) return true;
      return [l.customer, l.commodity, l.pickup_location, l.dropoff_location, l.id]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [loads, search, filterSearch, loadStatusFilter]);

  const onFocusLoad = (load: DispatchLoad) => {
    setSelectedLoadId(load.id);
    const pts = load.stops
      .filter((s) => s.latitude != null && s.longitude != null)
      .map((s) => [s.longitude as number, s.latitude as number] as [number, number]);
    if (pts.length === 0 || !mapRef.current) return;
    if (pts.length === 1) {
      mapRef.current.flyTo({ center: pts[0], zoom: 11, duration: 1000 });
    } else {
      const bounds = new maplibregl.LngLatBounds(pts[0], pts[0]);
      pts.forEach((p) => bounds.extend(p));
      mapRef.current.fitBounds(bounds, { padding: 80, duration: 1000 });
    }
  };

  // Keep map sized on view changes
  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.resize(), 50);
    return () => clearTimeout(t);
  }, [view]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-100 text-slate-900">
      <div className="grid h-full grid-cols-[76px_1fr]">
        <DispatchSidebarNav />

        <div className="grid h-full min-h-0 grid-rows-[64px_56px_48px_1fr]">
          <DispatchTopBar
            search={search}
            onSearch={setSearch}
            onAddLoad={() => console.info("[dispatch] add load")}
            onAddDriver={() => console.info("[dispatch] add driver")}
            onAddPin={() => console.info("[dispatch] add pin")}
          />
          <DispatchViewControls
            date={date}
            onDateChange={setDate}
            view={view}
            onViewChange={setView}
          />
          <DispatchFilterBar
            filterSearch={filterSearch}
            onFilterSearch={setFilterSearch}
            driverStatus={driverStatusFilter}
            onDriverStatus={setDriverStatusFilter}
            loadStatus={loadStatusFilter}
            onLoadStatus={setLoadStatusFilter}
            loadType={loadTypeFilter}
            onLoadType={setLoadTypeFilter}
            vehicleType={vehicleTypeFilter}
            onVehicleType={setVehicleTypeFilter}
          />

          <div className="grid min-h-0 grid-cols-[320px_1fr_340px]">
            <FleetDriverList
              drivers={filteredDrivers}
              totalCount={sourceDrivers.length}
              selectedId={selectedDriverId}
              onSelect={setSelectedDriverId}
              onCenter={onCenter}
              onCall={onCall}
              connected={connected}
            />
            <AnderouteDispatchMap
              drivers={filteredDrivers}
              pois={pois}
              loads={filteredLoads}
              selectedDriverId={selectedDriverId}
              onSelectDriver={setSelectedDriverId}
              selectedLoadId={selectedLoadId}
              onSelectLoad={setSelectedLoadId}
              mapRef={mapRef}
            />
            <LoadsDispatchPanel
              loads={filteredLoads}
              selectedLoadId={selectedLoadId}
              onSelect={(l) => setSelectedLoadId(l.id)}
              onFocus={onFocusLoad}
              usingMock={loadsUsingMock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
