import { createFileRoute } from "@tanstack/react-router";
import { AnderouteUSLiveLogisticsMap } from "@/components/AnderouteUSLiveLogisticsMap";

export const Route = createFileRoute("/osm")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Anderoute US Live Logistics Map" },
      {
        name: "description",
        content:
          "Full-screen United States logistics command map with live driver tracking, POIs, and route overlays on Leaflet + OpenStreetMap.",
      },
    ],
  }),
  component: AnderouteUSLiveLogisticsMap,
});
