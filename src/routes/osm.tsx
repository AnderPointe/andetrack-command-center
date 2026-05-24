import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

declare global {
  interface Window {
    L: any;
    __osmInit?: boolean;
  }
}

export const Route = createFileRoute("/osm")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Anderoute Live Map UI" },
      { name: "description", content: "Leaflet + OpenStreetMap dispatch UI." },
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
  component: AnderouteLeafletLiveMap,
});

const STYLES = `
* { box-sizing: border-box; margin: 0; padding: 0; }
.osm-root { min-height: 100vh; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #020617; color: #f8fafc; overflow: hidden; }
.app-shell { display: grid; grid-template-columns: 390px 1fr; width: 100vw; height: 100vh; }
.sidebar { background: linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98)); border-right: 1px solid rgba(255,255,255,0.1); padding: 18px; overflow-y: auto; z-index: 1000; box-shadow: 20px 0 60px rgba(0,0,0,0.35); }
.brand-card { padding: 20px; border-radius: 28px; background: radial-gradient(circle at top left, rgba(20,184,166,0.28), transparent 38%), radial-gradient(circle at bottom right, rgba(249,115,22,0.22), transparent 38%), rgba(15,23,42,0.92); border: 1px solid rgba(255,255,255,0.12); margin-bottom: 16px; }
.brand-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.brand-icon { width: 48px; height: 48px; border-radius: 18px; background: rgba(20,184,166,0.18); border: 1px solid rgba(94,234,212,0.25); display: grid; place-items: center; font-size: 24px; }
.brand-title { font-size: 24px; font-weight: 900; letter-spacing: -0.05em; }
.brand-subtitle { color: #cbd5e1; font-size: 13px; margin-top: 3px; }
.metric-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; }
.metric { padding: 12px; border-radius: 18px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); }
.metric-label { font-size: 11px; color: #94a3b8; margin-bottom: 6px; }
.metric-value { font-size: 19px; font-weight: 900; }
.panel { padding: 15px; border-radius: 24px; background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 14px; }
.panel-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
.search-box { width: 100%; height: 44px; border: 1px solid rgba(255,255,255,0.1); background: rgba(15,23,42,0.95); color: #fff; border-radius: 16px; padding: 0 14px; outline: none; font-size: 14px; }
.search-box::placeholder { color: #64748b; }
.filter-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; }
.filter-btn, .action-btn { border: 1px solid rgba(255,255,255,0.1); background: rgba(15,23,42,0.9); color: #cbd5e1; border-radius: 16px; padding: 11px 12px; cursor: pointer; font-weight: 700; transition: 0.2s ease; text-align: left; font-family: inherit; }
.filter-btn:hover, .action-btn:hover { background: rgba(255,255,255,0.1); transform: translateY(-1px); }
.filter-btn.active { background: rgba(20,184,166,0.16); border-color: rgba(94,234,212,0.35); color: #ccfbf1; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 999px; margin-right: 8px; }
.available { background: #10b981; } .assigned { background: #38bdf8; } .loaded { background: #f97316; } .break { background: #a78bfa; } .alert { background: #ef4444; } .offline { background: #64748b; }
.action-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-top: 10px; }
.primary { background: #0f766e; border-color: rgba(94,234,212,0.35); color: white; text-align: center; }
.orange { background: rgba(249,115,22,0.18); border-color: rgba(251,146,60,0.35); color: #fed7aa; text-align: center; }
.driver-list { display: flex; flex-direction: column; gap: 10px; }
.driver-card { padding: 14px; border-radius: 22px; background: rgba(15,23,42,0.88); border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.2s ease; }
.driver-card:hover, .driver-card.active { background: rgba(20,184,166,0.11); border-color: rgba(94,234,212,0.35); transform: translateY(-1px); }
.driver-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.driver-name { font-weight: 900; margin-bottom: 3px; }
.driver-meta { color: #94a3b8; font-size: 12px; }
.status-pill { height: fit-content; border-radius: 999px; padding: 5px 9px; font-size: 11px; font-weight: 800; background: rgba(255,255,255,0.08); white-space: nowrap; }
.driver-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; }
.stat-box { padding: 9px; border-radius: 14px; background: rgba(2,6,23,0.74); }
.stat-label { color: #64748b; font-size: 10px; margin-bottom: 4px; }
.stat-value { font-size: 13px; font-weight: 900; }
.map-area { position: relative; height: 100vh; }
#map { height: 100vh; width: 100%; z-index: 1; background: #020617; }
.map-topbar { position: absolute; top: 18px; left: 18px; right: 18px; z-index: 800; display: flex; justify-content: space-between; gap: 12px; pointer-events: none; }
.map-chip-row, .selected-card { pointer-events: auto; border: 1px solid rgba(255,255,255,0.1); background: rgba(2,6,23,0.82); backdrop-filter: blur(14px); border-radius: 22px; padding: 12px 14px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.map-chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { border-radius: 999px; background: rgba(255,255,255,0.08); color: #cbd5e1; padding: 8px 11px; font-size: 12px; font-weight: 700; }
.selected-card { min-width: 190px; }
.selected-label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.selected-value { font-weight: 900; }
.leaflet-popup-content-wrapper, .leaflet-popup-tip { background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.12); }
.leaflet-popup-content { margin: 13px 15px; line-height: 1.45; }
.leaflet-control-attribution { background: rgba(15,23,42,0.78) !important; color: #cbd5e1 !important; }
.leaflet-control-attribution a { color: #67e8f9 !important; }
.map-marker { width: 40px; height: 40px; border-radius: 999px; border: 3px solid white; display: grid; place-items: center; box-shadow: 0 12px 24px rgba(0,0,0,0.35); color: white; font-weight: 900; position: relative; }
.map-marker::before { content: ""; position: absolute; width: 46px; height: 46px; border-radius: 999px; background: inherit; opacity: 0.2; animation: osm-pulse 1.8s infinite; z-index: -1; }
@keyframes osm-pulse { 0% { transform: scale(0.8); opacity: 0.35; } 70% { transform: scale(1.35); opacity: 0; } 100% { transform: scale(0.8); opacity: 0; } }
@media (max-width: 980px) {
  .osm-root { overflow: auto; }
  .app-shell { grid-template-columns: 1fr; height: auto; }
  .sidebar { height: auto; max-height: none; }
  .map-area, #map { height: 70vh; }
  .map-topbar { flex-direction: column; }
}
`;

function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    const start = Date.now();
    const check = setInterval(() => {
      if (window.L) {
        clearInterval(check);
        resolve(window.L);
      } else if (Date.now() - start > 10000) {
        clearInterval(check);
        reject(new Error("Leaflet failed to load"));
      }
    }, 50);
  });
}

function AnderouteLeafletLiveMap() {
  useEffect(() => {
    if (window.__osmInit) return;
    window.__osmInit = true;

    let map: any = null;
    let cleanup = () => {};

    loadLeaflet().then((L) => {
      const DEFAULT_CENTER: [number, number] = [32.7767, -96.7970];
      const statusLabels: Record<string, string> = {
        available: "Available", assigned: "Assigned", loaded: "Loaded",
        break: "Break", alert: "Alert", offline: "Offline",
      };
      const statusColors: Record<string, string> = {
        available: "#10b981", assigned: "#38bdf8", loaded: "#f97316",
        break: "#a78bfa", alert: "#ef4444", offline: "#64748b",
      };

      let addPinMode = false;
      let selectedDriverId = "driver-087";
      const activeStatuses = new Set(["available", "assigned", "loaded", "break", "alert", "offline"]);
      let searchTerm = "";
      const driverMarkerLayer = L.layerGroup();
      const staticMarkerLayer = L.layerGroup();
      const routeLayer = L.layerGroup();
      const userLayer = L.layerGroup();
      let customPins: any[] = [];

      const drivers = [
        { id: "driver-214", name: "Marcus Reed", unit: "Unit 214", status: "available", vehicleType: "Box Truck", speedMph: 0, etaMinutes: 12, load: "No active load", battery: 91, signal: 95, position: [32.7812, -96.7989], route: [[32.7812, -96.7989], [32.7781, -96.8042], [32.7733, -96.8094], [32.7689, -96.8122]] },
        { id: "driver-087", name: "Alicia Moore", unit: "Unit 087", status: "loaded", vehicleType: "Hotshot", speedMph: 47, etaMinutes: 22, load: "Load 1002", battery: 84, signal: 88, position: [32.7894, -96.7802], route: [[32.7894, -96.7802], [32.7935, -96.7762], [32.7964, -96.7731], [32.7986, -96.7718]] },
        { id: "driver-331", name: "Derrick Lane", unit: "Unit 331", status: "assigned", vehicleType: "Semi", speedMph: 39, etaMinutes: 35, load: "Load 1004", battery: 77, signal: 82, position: [32.7640, -96.7865], route: [[32.7640, -96.7865], [32.7711, -96.7931], [32.7794, -96.8015], [32.7909, -96.8089]] },
        { id: "driver-522", name: "Vanessa King", unit: "Unit 522", status: "break", vehicleType: "Cargo Van", speedMph: 0, etaMinutes: 0, load: "Break", battery: 66, signal: 90, position: [32.8025, -96.7997], route: [] },
        { id: "driver-909", name: "Chris Nolan", unit: "Unit 909", status: "alert", vehicleType: "Personal Vehicle", speedMph: 0, etaMinutes: 0, load: "GPS attention needed", battery: 18, signal: 42, position: [32.7528, -96.8212], route: [[32.7528, -96.8212], [32.7592, -96.8166], [32.7689, -96.8122]] },
      ] as any[];

      const staticMarkers = [
        { id: "depot-dfw", type: "depot", title: "DFW Dispatch Hub", description: "Main yard • Live dispatch monitoring", position: [32.7909, -96.8089] },
        { id: "load-1001", type: "load", title: "Pickup: Load 1001", description: "2 pallets • Priority pickup • Dock 4", position: [32.7689, -96.8122] },
        { id: "load-1002", type: "load", title: "Drop: Load 1002", description: "Final mile delivery • Customer waiting", position: [32.7986, -96.7718] },
      ];

      map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView(DEFAULT_CENTER, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      driverMarkerLayer.addTo(map);
      staticMarkerLayer.addTo(map);
      routeLayer.addTo(map);
      userLayer.addTo(map);

      function makeIcon(type: string, status?: string) {
        let color = "#111827"; let label = "📍";
        if (type === "driver") { color = statusColors[status!] || "#14b8a6"; label = "➤"; }
        if (type === "load") { color = "#f97316"; label = "📦"; }
        if (type === "depot") { color = "#0f766e"; label = "◆"; }
        if (type === "user") { color = "#2563eb"; label = "◎"; }
        return L.divIcon({
          className: "custom-map-marker",
          html: `<div class="map-marker" style="background:${color};">${label}</div>`,
          iconSize: [40, 40], iconAnchor: [20, 38], popupAnchor: [0, -36],
        });
      }

      function getFiltered() {
        return drivers.filter((d) => {
          const ms = activeStatuses.has(d.status);
          const hay = `${d.name} ${d.unit} ${d.vehicleType} ${d.load}`.toLowerCase();
          const msq = !searchTerm || hay.includes(searchTerm.toLowerCase());
          return ms && msq;
        });
      }

      function renderFilters() {
        const grid = document.getElementById("filterGrid")!;
        grid.innerHTML = "";
        Object.keys(statusLabels).forEach((status) => {
          const btn = document.createElement("button");
          btn.className = `filter-btn ${activeStatuses.has(status) ? "active" : ""}`;
          btn.innerHTML = `<span class="dot ${status}"></span>${statusLabels[status]}`;
          btn.onclick = () => {
            if (activeStatuses.has(status)) activeStatuses.delete(status);
            else activeStatuses.add(status);
            renderAll();
          };
          grid.appendChild(btn);
        });
      }

      function renderDriverList(filtered: any[]) {
        const list = document.getElementById("driverList")!;
        document.getElementById("shownCount")!.textContent = `${filtered.length} shown`;
        list.innerHTML = "";
        filtered.forEach((d) => {
          const card = document.createElement("div");
          card.className = `driver-card ${selectedDriverId === d.id ? "active" : ""}`;
          card.innerHTML = `
            <div class="driver-top">
              <div>
                <div class="driver-name">${d.unit}</div>
                <div class="driver-meta">${d.name} • ${d.vehicleType}</div>
              </div>
              <div class="status-pill"><span class="dot ${d.status}"></span>${statusLabels[d.status]}</div>
            </div>
            <div class="driver-stats">
              <div class="stat-box"><div class="stat-label">Speed</div><div class="stat-value">${d.speedMph} mph</div></div>
              <div class="stat-box"><div class="stat-label">ETA</div><div class="stat-value">${d.etaMinutes || "--"} min</div></div>
              <div class="stat-box"><div class="stat-label">Battery</div><div class="stat-value">${d.battery}%</div></div>
            </div>`;
          card.onclick = () => {
            selectedDriverId = d.id;
            map.flyTo(d.position, 15, { duration: 0.8 });
            renderAll();
          };
          list.appendChild(card);
        });
      }

      function renderMap(filtered: any[]) {
        driverMarkerLayer.clearLayers();
        staticMarkerLayer.clearLayers();
        routeLayer.clearLayers();

        filtered.forEach((d) => {
          if (d.route.length > 1) {
            const line = L.polyline([d.position, ...d.route.slice(1)], {
              color: selectedDriverId === d.id ? "#14b8a6" : "#94a3b8",
              weight: selectedDriverId === d.id ? 6 : 4,
              opacity: selectedDriverId === d.id ? 0.85 : 0.32,
              dashArray: selectedDriverId === d.id ? null : "8 10",
            });
            routeLayer.addLayer(line);
          }
          const m = L.marker(d.position, { icon: makeIcon("driver", d.status) }).bindPopup(`
            <strong>${d.name}</strong><br/>${d.unit} • ${d.vehicleType}<br/>
            Status: ${statusLabels[d.status]}<br/>Speed: ${d.speedMph} mph<br/>
            ETA: ${d.etaMinutes || "N/A"} min<br/>Load: ${d.load}<br/>
            Battery: ${d.battery}% • Signal: ${d.signal}%`);
          m.on("click", () => { selectedDriverId = d.id; renderAll(); });
          driverMarkerLayer.addLayer(m);
        });

        [...staticMarkers, ...customPins].forEach((item) => {
          const m = L.marker(item.position, { icon: makeIcon(item.type || "custom") }).bindPopup(`
            <strong>${item.title}</strong><br/>${item.description}<br/>
            ${item.position[0].toFixed(5)}, ${item.position[1].toFixed(5)}`);
          staticMarkerLayer.addLayer(m);
        });
      }

      function updateMetrics() {
        document.getElementById("metricDrivers")!.textContent = String(drivers.length);
        document.getElementById("metricActive")!.textContent = String(drivers.filter((d) => d.status !== "offline" && d.status !== "break").length);
        document.getElementById("metricAlerts")!.textContent = String(drivers.filter((d) => d.status === "alert").length);
        const sel = drivers.find((d) => d.id === selectedDriverId);
        document.getElementById("selectedUnit")!.textContent = sel ? sel.unit : "None";
      }

      function renderAll() {
        const filtered = getFiltered();
        renderFilters();
        renderDriverList(filtered);
        renderMap(filtered);
        updateMetrics();
      }

      const searchEl = document.getElementById("searchInput") as HTMLInputElement;
      const onSearch = (e: any) => { searchTerm = e.target.value; renderAll(); };
      searchEl?.addEventListener("input", onSearch);

      const addBtn = document.getElementById("addPinBtn")!;
      const onAdd = () => {
        addPinMode = !addPinMode;
        document.getElementById("statusMessage")!.textContent = addPinMode ? "Add Pin Mode On" : "Add Pin Mode Off";
      };
      addBtn.addEventListener("click", onAdd);

      const clearBtn = document.getElementById("clearPinsBtn")!;
      const onClear = () => {
        customPins = [];
        document.getElementById("statusMessage")!.textContent = "Custom pins cleared";
        renderAll();
      };
      clearBtn.addEventListener("click", onClear);

      const locBtn = document.getElementById("locateBtn")!;
      const onLoc = () => map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true, timeout: 10000 });
      locBtn.addEventListener("click", onLoc);

      map.on("locationfound", (event: any) => {
        userLayer.clearLayers();
        const m = L.marker(event.latlng, { icon: makeIcon("user") })
          .bindPopup(`<strong>Your Location</strong><br/>Accuracy: ${Math.round(event.accuracy)} meters`);
        const c = L.circle(event.latlng, { radius: event.accuracy, color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.12, weight: 2 });
        userLayer.addLayer(m); userLayer.addLayer(c);
        document.getElementById("statusMessage")!.textContent = `Location found ±${Math.round(event.accuracy)}m`;
      });

      map.on("locationerror", (event: any) => {
        document.getElementById("statusMessage")!.textContent = "Location blocked or unavailable";
        alert(event.message || "Unable to access location. Use HTTPS and allow browser location permissions.");
      });

      map.on("click", (event: any) => {
        if (!addPinMode) return;
        customPins.push({
          id: `pin-${Date.now()}`, type: "custom", title: "Custom Dispatch Pin",
          description: "Manually added map note", position: [event.latlng.lat, event.latlng.lng],
        });
        document.getElementById("statusMessage")!.textContent = "Custom pin added";
        renderAll();
      });

      const interval = window.setInterval(() => {
        drivers.forEach((d) => {
          if (["break", "offline"].includes(d.status) || !d.route.length) return;
          const dest = d.route[d.route.length - 1];
          d.position[0] += (dest[0] - d.position[0]) * 0.012;
          d.position[1] += (dest[1] - d.position[1]) * 0.012;
          d.speedMph = Math.max(0, Math.round(d.speedMph + (Math.random() * 4 - 1.5)));
          if (Math.random() > 0.65) d.etaMinutes = Math.max(0, d.etaMinutes - 1);
        });
        renderAll();
      }, 2500);

      renderAll();

      cleanup = () => {
        clearInterval(interval);
        searchEl?.removeEventListener("input", onSearch);
        addBtn.removeEventListener("click", onAdd);
        clearBtn.removeEventListener("click", onClear);
        locBtn.removeEventListener("click", onLoc);
        map?.remove();
      };
    });

    return () => {
      cleanup();
      window.__osmInit = false;
    };
  }, []);

  return (
    <div className="osm-root">
      <style>{STYLES}</style>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand-card">
            <div className="brand-row">
              <div className="brand-icon">🛰️</div>
              <div>
                <div className="brand-title">Anderoute Live Maps</div>
                <div className="brand-subtitle">Open-source Leaflet + OpenStreetMap dispatch UI</div>
              </div>
            </div>
            <div className="metric-grid">
              <div className="metric"><div className="metric-label">Drivers</div><div className="metric-value" id="metricDrivers">0</div></div>
              <div className="metric"><div className="metric-label">Active</div><div className="metric-value" id="metricActive">0</div></div>
              <div className="metric"><div className="metric-label">Alerts</div><div className="metric-value" id="metricAlerts">0</div></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">Search</div>
            <input id="searchInput" className="search-box" placeholder="Search driver, unit, load..." />
          </div>

          <div className="panel">
            <div className="panel-title">Status Filters</div>
            <div className="filter-grid" id="filterGrid" />
          </div>

          <div className="panel">
            <div className="panel-title">Map Actions</div>
            <button className="action-btn" id="locateBtn">📍 Locate Me</button>
            <div className="action-row">
              <button className="action-btn primary" id="addPinBtn">➕ Add Pin Mode</button>
              <button className="action-btn orange" id="clearPinsBtn">Clear Pins</button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title"><span>Fleet List</span><span id="shownCount">0 shown</span></div>
            <div className="driver-list" id="driverList" />
          </div>
        </aside>

        <div className="map-area">
          <div className="map-topbar">
            <div className="map-chip-row">
              <span className="chip">🟢 Live Map Ready</span>
              <span className="chip">🗺️ OpenStreetMap Tiles</span>
              <span className="chip">📍 Click Map To Add Pins</span>
              <span className="chip" id="statusMessage">System online</span>
            </div>
            <div className="selected-card">
              <div className="selected-label">Selected Unit</div>
              <div className="selected-value" id="selectedUnit">None</div>
            </div>
          </div>
          <div id="map" />
        </div>
      </div>
    </div>
  );
}
