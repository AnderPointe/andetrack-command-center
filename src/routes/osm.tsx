import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (Leaflet + bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const Route = createFileRoute("/osm")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Map — OpenStreetMap" },
      { name: "description", content: "Leaflet + OpenStreetMap clone." },
    ],
  }),
  component: OsmPage,
});

function OsmPage() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([51.505, -0.09], 13);
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}
