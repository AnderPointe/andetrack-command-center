import { createFileRoute } from "@tanstack/react-router";
import AnderouteDispatchBoard from "@/components/dispatch/AnderouteDispatchBoard";

export const Route = createFileRoute("/dispatch-board")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Anderoute Dispatch Board — Live Map" },
      {
        name: "description",
        content:
          "Live logistics dispatch board with Leaflet + OpenStreetMap, real-time driver tracking, fleet sidebar, and dispatcher controls.",
      },
    ],
  }),
  component: AnderouteDispatchBoard,
});
