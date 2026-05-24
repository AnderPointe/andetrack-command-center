import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

export const Route = createFileRoute("/osm")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Map — OpenStreetMap" },
      { name: "description", content: "Leaflet + OpenStreetMap clone." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
        integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
        crossorigin: "",
      },
    ],
    scripts: [
      {
        src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
        integrity: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",
        crossorigin: "",
      },
    ],
  }),
  component: OsmPage,
});

function loadLeaflet(): Promise<typeof import("leaflet")> {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    const check = setInterval(() => {
      if (window.L) {
        clearInterval(check);
        resolve(window.L);
      }
    }, 50);
    setTimeout(() => {
      clearInterval(check);
      if (window.L) resolve(window.L);
      else reject(new Error("Leaflet failed to load"));
    }, 10000);
  });
}

function OsmPage() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let map: import("leaflet").Map | null = null;

    loadLeaflet().then((L) => {
      map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    });

    return () => {
      map?.remove();
      initialized.current = false;
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
}
