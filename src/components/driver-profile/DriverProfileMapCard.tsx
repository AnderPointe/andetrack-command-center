/**
 * DriverProfileMapCard
 *
 * Mini MapLibre map showing the driver's current position, pickup, dropoff,
 * and a placeholder straight-line route between them. Self-contained — owns
 * its own map instance and tears down on unmount.
 */
import { useEffect, useRef } from "react";
import maplibregl, { type Map as MLMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { resolveActiveStyleUrl } from "@/services/mapStyleService";

interface Props {
  driver: { lat: number; lng: number; heading?: number | null; color: string };
  pickup: { lat: number; lng: number; label: string };
  dropoff: { lat: number; lng: number; label: string };
}

export function DriverProfileMapCard({ driver, pickup, dropoff }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: resolveActiveStyleUrl(),
      center: [driver.lng, driver.lat],
      zoom: 9,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.on("load", () => {
      // Route placeholder line
      map.addSource("driver-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [pickup.lng, pickup.lat],
              [driver.lng, driver.lat],
              [dropoff.lng, dropoff.lat],
            ],
          },
        },
      });
      map.addLayer({
        id: "driver-route",
        type: "line",
        source: "driver-route",
        paint: {
          "line-color": "#14b8a6",
          "line-width": 3,
          "line-opacity": 0.85,
          "line-dasharray": [1, 1.6],
        },
      });

      const pin = (color: string, label: string) => {
        const el = document.createElement("div");
        el.innerHTML = `<div style="background:${color};color:white;font:600 10px ui-sans-serif;padding:3px 7px;border-radius:9999px;box-shadow:0 4px 14px rgba(0,0,0,.4)">${label}</div>`;
        return el;
      };

      new maplibregl.Marker({ element: pin("#f97316", "PICKUP") })
        .setLngLat([pickup.lng, pickup.lat])
        .addTo(map);
      new maplibregl.Marker({ element: pin("#0ea5e9", "DROPOFF") })
        .setLngLat([dropoff.lng, dropoff.lat])
        .addTo(map);

      const truck = document.createElement("div");
      truck.style.cssText = `width:34px;height:34px;border-radius:9999px;background:${driver.color};border:3px solid white;box-shadow:0 0 0 3px ${driver.color}55,0 6px 20px rgba(0,0,0,.5);display:grid;place-items:center;color:white;font-weight:700;font-size:14px;transform:rotate(${driver.heading ?? 0}deg)`;
      truck.textContent = "▲";
      new maplibregl.Marker({ element: truck })
        .setLngLat([driver.lng, driver.lat])
        .addTo(map);

      // Fit bounds to show all three
      const bounds = new maplibregl.LngLatBounds(
        [pickup.lng, pickup.lat],
        [pickup.lng, pickup.lat],
      );
      bounds.extend([driver.lng, driver.lat]);
      bounds.extend([dropoff.lng, dropoff.lat]);
      map.fitBounds(bounds, { padding: 60, duration: 600 });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="h-full w-full rounded-xl" />;
}
