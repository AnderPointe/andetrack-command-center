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
import type L from "leaflet";
import { DispatchSidebarNav } from "./DispatchSidebarNav";
import { DispatchTopBar } from "./DispatchTopBar";
import { DispatchViewControls } from "./DispatchViewControls";
import { DispatchFilterBar } from "./DispatchFilterBar";
import { FleetDriverList } from "./FleetDriverList";
import { AnderouteDispatchMap } from "./AnderouteDispatchMap";
import { useLiveDriverCurrent } from "@/hooks/useLiveDriverLocations";
import { useLogisticsMapPois } from "@/hooks/useLogisticsMapPois";
import { MOCK_DISPATCH_DRIVERS } from "@/data/mockDispatchDrivers";
import type { DispatchDriver, ViewMode } from "@/types/dispatch";
import { STALE_AFTER_SECONDS } from "./dispatchTokens";

export default function AnderouteDispatchBoard() {
  const { drivers: liveDrivers, connected } = useLiveDriverCurrent();
  const pois = useLogisticsMapPois();
  const mapRef = useRef<L.Map | null>(null);

  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [driverStatusFilter, setDriverStatusFilter] = useState("all");
  const [loadStatusFilter, setLoadStatusFilter] = useState("all");
  const [loadTypeFilter, setLoadTypeFilter] = useState("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all");
  const [view, setView] = useState<ViewMode>("map");
  const [date, setDate] = useState(() => new Date());
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

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
    mapRef.current?.flyTo([d.latitude, d.longitude], 12, { duration: 0.8 });
    setSelectedDriverId(d.driver_id);
  };

  const onCall = (d: DispatchDriver) => {
    // Hook into dialer / Twilio later. For now: no-op.
    console.info("[dispatch] call requested", d.driver_id);
  };

  // Keep map sized on view changes
  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.invalidateSize(), 50);
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

          <div className="grid min-h-0 grid-cols-[320px_1fr]">
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
              selectedDriverId={selectedDriverId}
              onSelectDriver={setSelectedDriverId}
              mapRef={mapRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
