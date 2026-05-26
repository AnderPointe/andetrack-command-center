import { drivers, statusMeta } from "@/data/mock";
import type { Driver } from "@/types";
import { Layers, Navigation, Eye, Zap, Users, Plus, Minus, Compass, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
    __anderouteInitMap?: () => void;
  }
}

const toggles = [
  { id: "routes", label: "Routes", icon: Navigation },
  { id: "traffic", label: "Traffic", icon: Zap },
  { id: "heat", label: "Heatmap", icon: Layers },
  { id: "cluster", label: "Cluster", icon: Users },
];

// Dark theme styles tuned for the Anderoute look.
const DARK_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#0f1418" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f1418" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7a8893" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2a3540" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9fb0bd" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#141a20" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1d262e" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#243038" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2e3d48" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#3a4d5a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#6a7c89" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1014" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d5260" }] },
];

const LIGHT_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f3f5f7" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5a6773" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e7ecf1" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d8e3ec" }] },
];

let scriptPromise: Promise<void> | null = null;
function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
  const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
  scriptPromise = new Promise<void>((resolve, reject) => {
    window.__anderouteInitMap = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__anderouteInitMap${channel ? `&channel=${channel}` : ""}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

function svgPin(color: string, selected: boolean): string {
  const size = selected ? 30 : 24;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'>
    <circle cx='12' cy='12' r='10' fill='${color}' opacity='0.25'/>
    <circle cx='12' cy='12' r='6' fill='${color}' stroke='white' stroke-width='2.5'/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function cssVar(name: string, fallback = "#14b8a6"): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function LiveMapPanel({
  onSelectDriver,
  selectedId,
  className,
  compact = false,
}: {
  onSelectDriver?: (d: Driver) => void;
  selectedId?: string | null;
  className?: string;
  compact?: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [active, setActive] = useState<Record<string, boolean>>({ routes: true, traffic: true });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any> | null>(null);
  const trafficLayerRef = useRef<any>(null);
  const polylinesRef = useRef<any[]>([]);

  const filtered = drivers.filter((d) => !statusFilter || d.status === statusFilter);

  // Init map
  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapEl.current || !window.google?.maps) return;
        const isDark = document.documentElement.classList.contains("dark");
        mapRef.current = new window.google.maps.Map(mapEl.current, {
          center: { lat: 39.5, lng: -98.5 },
          zoom: 4,
          disableDefaultUI: true,
          gestureHandling: "greedy",
          backgroundColor: isDark ? "#0f1418" : "#f3f5f7",
          styles: isDark ? DARK_MAP_STYLES : LIGHT_MAP_STYLES,
        });
        markersRef.current = new Map();
        trafficLayerRef.current = new window.google.maps.TrafficLayer();
        if (active.traffic) trafficLayerRef.current.setMap(mapRef.current);
        setReady(true);
      })
      .catch((e) => setError(e.message ?? "Map failed to load"));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync markers with filtered drivers + selection
  useEffect(() => {
    if (!ready || !mapRef.current || !window.google?.maps) return;
    const g = window.google.maps;
    const existing = markersRef.current!;
    const keepIds = new Set(filtered.map((d) => d.id));

    // Remove markers not in filter
    for (const [id, marker] of existing) {
      if (!keepIds.has(id)) {
        marker.setMap(null);
        existing.delete(id);
      }
    }

    filtered.forEach((d) => {
      const color = cssVar(`--${statusMeta[d.status].token}`, "#14b8a6");
      const selected = selectedId === d.id;
      const icon = {
        url: svgPin(color, selected),
        scaledSize: new g.Size(selected ? 30 : 24, selected ? 30 : 24),
        anchor: new g.Point(selected ? 15 : 12, selected ? 15 : 12),
      };
      let marker = existing.get(d.id);
      if (!marker) {
        marker = new g.Marker({
          position: { lat: d.currentLocation.lat, lng: d.currentLocation.lng },
          map: mapRef.current,
          icon,
          title: `${d.name} — ${d.currentLocation.label}`,
          zIndex: selected ? 999 : 10,
        });
        marker.addListener("click", () => onSelectDriver?.(d));
        existing.set(d.id, marker);
      } else {
        marker.setPosition({ lat: d.currentLocation.lat, lng: d.currentLocation.lng });
        marker.setIcon(icon);
        marker.setZIndex(selected ? 999 : 10);
      }
    });
  }, [ready, filtered, selectedId, onSelectDriver]);

  // Traffic toggle
  useEffect(() => {
    if (!ready || !trafficLayerRef.current) return;
    trafficLayerRef.current.setMap(active.traffic ? mapRef.current : null);
  }, [ready, active.traffic]);

  // Route polylines between drivers with active loads
  useEffect(() => {
    if (!ready || !window.google?.maps) return;
    const g = window.google.maps;
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    if (!active.routes) return;
    const teal = cssVar("--teal", "#14b8a6");
    filtered
      .filter((d) => d.currentLoadId)
      .forEach((d, i) => {
        const start = { lat: d.currentLocation.lat, lng: d.currentLocation.lng };
        const end = {
          lat: d.currentLocation.lat + Math.sin(i) * 2.5,
          lng: d.currentLocation.lng + Math.cos(i) * 4,
        };
        const line = new g.Polyline({
          path: [start, end],
          geodesic: true,
          strokeColor: teal,
          strokeOpacity: 0.85,
          strokeWeight: 2.5,
          map: mapRef.current,
          icons: [
            {
              icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 },
              offset: "0",
              repeat: "14px",
            },
          ],
        });
        polylinesRef.current.push(line);
      });
  }, [ready, filtered, active.routes]);

  // Map control handlers
  const zoom = (delta: number) => {
    if (!mapRef.current) return;
    mapRef.current.setZoom((mapRef.current.getZoom() ?? 4) + delta);
  };
  const recenter = () => {
    mapRef.current?.panTo({ lat: 39.5, lng: -98.5 });
    mapRef.current?.setZoom(4);
  };
  const fitAll = () => {
    if (!mapRef.current || !window.google?.maps || filtered.length === 0) return;
    const bounds = new window.google.maps.LatLngBounds();
    filtered.forEach((d) => bounds.extend({ lat: d.currentLocation.lat, lng: d.currentLocation.lng }));
    mapRef.current.fitBounds(bounds, 80);
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-md)]",
        className,
      )}
    >
      {/* Google Map surface */}
      <div ref={mapEl} className="absolute inset-0" />

      {/* Loading / error overlay */}
      {!ready && !error && (
        <div className="absolute inset-0 grid place-items-center bg-card/60 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-teal animate-pulse" />
            Loading live map…
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 grid place-items-center z-20 p-4">
          <div className="rounded-xl border border-border bg-popover px-4 py-3 text-center text-xs shadow-[var(--shadow-md)] max-w-sm">
            <div className="font-medium text-foreground">Map unavailable</div>
            <div className="text-muted-foreground mt-1">{error}</div>
          </div>
        </div>
      )}

      {/* Top toolbar */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 p-3 pointer-events-none">
        <div className="flex flex-wrap items-center gap-1 bg-popover/90 backdrop-blur-md rounded-lg border border-border p-1 shadow-[var(--shadow-sm)] pointer-events-auto">
          <button
            onClick={() => setStatusFilter(null)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-md font-medium transition",
              !statusFilter ? "bg-teal text-teal-foreground" : "text-foreground/70 hover:bg-secondary",
            )}
          >
            All <span className="tabular-nums opacity-80">{drivers.length}</span>
          </button>
          {(Object.keys(statusMeta) as Array<keyof typeof statusMeta>).slice(0, 6).map((s) => {
            const count = drivers.filter((d) => d.status === s).length;
            if (!count) return null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s === statusFilter ? null : s)}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5 transition",
                  statusFilter === s ? "bg-secondary text-foreground" : "text-foreground/70 hover:bg-secondary/60",
                )}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(--${statusMeta[s].token})` }}
                />
                {statusMeta[s].label}
                <span className="text-muted-foreground tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-1 bg-popover/90 backdrop-blur-md rounded-lg border border-border p-1 shadow-[var(--shadow-sm)] pointer-events-auto">
          {toggles.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActive((a) => ({ ...a, [t.id]: !a[t.id] }))}
                className={cn(
                  "text-xs px-2 py-1 rounded-md inline-flex items-center gap-1.5 transition",
                  active[t.id]
                    ? "bg-teal text-teal-foreground"
                    : "text-foreground/70 hover:bg-secondary",
                )}
              >
                <Icon className="size-3.5" />
                {!compact && t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map controls — zoom + compass */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
        <div className="flex flex-col bg-popover/90 backdrop-blur-md rounded-lg border border-border shadow-[var(--shadow-sm)] overflow-hidden">
          <button onClick={() => zoom(1)} className="size-8 grid place-items-center hover:bg-secondary"><Plus className="size-3.5" /></button>
          <div className="h-px bg-border" />
          <button onClick={() => zoom(-1)} className="size-8 grid place-items-center hover:bg-secondary"><Minus className="size-3.5" /></button>
        </div>
        <button onClick={recenter} className="size-8 grid place-items-center rounded-lg border border-border bg-popover/90 backdrop-blur-md shadow-[var(--shadow-sm)] hover:bg-secondary">
          <Compass className="size-3.5" />
        </button>
        <button onClick={fitAll} className="size-8 grid place-items-center rounded-lg border border-border bg-popover/90 backdrop-blur-md shadow-[var(--shadow-sm)] hover:bg-secondary">
          <Maximize2 className="size-3.5" />
        </button>
      </div>

      {/* Bottom-left legend */}
      {active.traffic && (
        <div className="absolute bottom-3 left-3 z-10 rounded-lg border border-border bg-popover/90 backdrop-blur-md px-2.5 py-1.5 text-[10px] shadow-[var(--shadow-sm)]">
          <div className="font-semibold text-foreground/80 mb-1">Traffic</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-4 rounded-full bg-success" />
            <span className="h-1 w-4 rounded-full bg-warning" />
            <span className="h-1 w-4 rounded-full bg-destructive" />
            <span className="ml-1 text-muted-foreground">Flow</span>
          </div>
        </div>
      )}

      {/* Bottom-right live status */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-lg border border-border bg-popover/90 backdrop-blur-md px-3 py-1.5 text-[11px] shadow-[var(--shadow-sm)]">
        <Eye className="size-3" />
        <span className="font-medium tabular-nums">{filtered.length}</span>
        <span className="text-muted-foreground">units live</span>
        <span className="ml-1 size-1.5 rounded-full bg-success animate-pulse" />
      </div>

      {ready && filtered.length === 0 && (
        <div className="absolute inset-0 grid place-items-center z-10 pointer-events-none">
          <div className="rounded-xl border border-border bg-popover/90 backdrop-blur px-5 py-4 text-center shadow-[var(--shadow-md)]">
            <div className="text-sm font-medium">No drivers match this filter</div>
            <div className="text-xs text-muted-foreground mt-0.5">Adjust status filters above to see units.</div>
          </div>
        </div>
      )}
    </div>
  );
}
